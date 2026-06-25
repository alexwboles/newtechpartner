#!/bin/bash
cd /home/z/my-project
while true; do
  bun run dev >> dev.log 2>&1 &
  SERVER_PID=$!
  echo "$(date): Started server PID $SERVER_PID" >> server-monitor.log
  for i in $(seq 1 180); do
    sleep 3
    if ! kill -0 $SERVER_PID 2>/dev/null; then
      echo "$(date): Server $SERVER_PID died, restarting..." >> server-monitor.log
      break
    fi
    curl -s -o /dev/null http://localhost:3000 2>/dev/null
  done
  kill $SERVER_PID 2>/dev/null
  sleep 1
done