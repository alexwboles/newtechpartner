#!/bin/bash
cd /home/z/my-project
while true; do
  npx next dev -p 3000 -H 0.0.0.0 > dev.log 2>&1 &
  SERVER_PID=$!
  # Keep alive by making requests
  for i in $(seq 1 60); do
    sleep 3
    if ! kill -0 $SERVER_PID 2>/dev/null; then
      echo "Server died at $(date), restarting..." >> /home/z/my-project/server-monitor.log
      break
    fi
    curl -s -o /dev/null http://localhost:3000 2>/dev/null
  done
  kill $SERVER_PID 2>/dev/null
  sleep 2
done
