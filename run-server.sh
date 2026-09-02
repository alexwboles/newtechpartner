#!/bin/bash
cd /home/z/my-project
while true; do
  echo "$(date): Starting dev server..." >> server-monitor.log
  bun run dev >> dev.log 2>&1 &
  PID=$!
  echo "$(date): PID=$PID" >> server-monitor.log
  
  # Monitor the process
  while kill -0 $PID 2>/dev/null; do
    sleep 2
  done
  
  echo "$(date): Process $PID exited" >> server-monitor.log
  sleep 2
done
