const assert = require('node:assert/strict');
const {prepareContactEmail, deliverContactInquiry, CONTACT_EMAIL} = require('../output/contact-tests/contact-delivery.js');
const inquiry = Object.freeze({name:' Demo & North ',business:'Example #1',email:'demo@example.com',message:'Line one\nLine two & notes = kept + exact'});

(async () => {
  const draft = prepareContactEmail(inquiry);
  const url = new URL(draft.mailto);
  assert.equal(url.protocol,'mailto:');
  assert.equal(url.pathname,CONTACT_EMAIL);
  assert.equal(url.searchParams.get('subject'),'New TechPartner Inquiry from Demo & North (Example #1)');
  assert.equal(url.searchParams.get('body'),draft.body);
  assert(draft.body.endsWith(inquiry.message));
  assert(draft.body.includes('\n\nMessage:\n'));
  assert.equal(prepareContactEmail({...inquiry,name:'Demo\r\nOther'}).subject.includes('\n'),false);
  for(const bad of [{...inquiry,name:' '},{...inquiry,email:'not-an-email'},{...inquiry,email:'x@example.com\nBcc: other@example.com'},{...inquiry,message:'x'.repeat(10001)}]) {
    assert.throws(()=>prepareContactEmail(bad));
  }
  const noFetch = () => { throw Error('Fallback must not call a service'); };
  assert.deepEqual(await deliverContactInquiry(inquiry,{fetcher:noFetch}),draft);
  assert.deepEqual(await deliverContactInquiry(inquiry,{webhookUrl:'  ',fetcher:noFetch}),draft);

  let captured;
  const success=await deliverContactInquiry(inquiry,{webhookUrl:'https://test.invalid/approved-endpoint',fetcher:async(url,options)=>{captured={url,options};return {ok:true,json:async()=>({accepted:true})};}});
  assert.deepEqual(success,{mode:'submitted'});
  assert.equal(captured.options.method,'POST');
  assert.equal(captured.options.headers['Content-Type'],'application/json');
  assert.equal(JSON.parse(captured.options.body).message,inquiry.message);
  assert.equal(JSON.parse(captured.options.body).subject,draft.subject);
  assert.equal(captured.options.signal.aborted,false);
  const before=JSON.stringify(inquiry);
  await assert.rejects(deliverContactInquiry(inquiry,{webhookUrl:'/test',fetcher:async()=>({ok:false,status:500})}),/could not be submitted/);
  await assert.rejects(deliverContactInquiry(inquiry,{webhookUrl:'/test',fetcher:async()=>({ok:true,json:async()=>({accepted:false})})}),/not confirmed/);
  await assert.rejects(deliverContactInquiry(inquiry,{webhookUrl:'/test',fetcher:async()=>({ok:true,json:async()=>{throw Error('HTML instead of acknowledgement');}})}),/not confirmed/);
  await assert.rejects(deliverContactInquiry(inquiry,{webhookUrl:'/test',fetcher:async()=>{throw Error('sensitive upstream details');}}),error=>/connection failed/.test(error.message)&&!error.message.includes('sensitive'));
  await assert.rejects(deliverContactInquiry(inquiry,{webhookUrl:'/test',timeoutMs:5,fetcher:async(_url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('aborted')),{once:true}))}),/timed out/);
  assert.equal(JSON.stringify(inquiry),before);
  let release;
  let settled=false;
  const waiting=deliverContactInquiry(inquiry,{webhookUrl:'/test',fetcher:()=>new Promise(resolve=>{release=resolve;})}).then(result=>{settled=true;return result;});
  await Promise.resolve();
  assert.equal(settled,false,'Must not claim submitted before response');
  release({ok:true,json:async()=>({accepted:true})});
  assert.deepEqual(await waiting,{mode:'submitted'});
  console.log('PASS contact recipient/encoding, no-network email preparation, validation, HTTP acceptance, response wait, visible-error messages, timeout and input preservation');
})().catch(error=>{console.error(error);process.exitCode=1;});
