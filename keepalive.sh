#!/bin/bash
# TechPartner dev server keepalive
cd /home/z/my-project
while true; do
  npx next dev -p 3000 -H 0.0.0.0 >> dev.log 2>&1 &
  PID=$!
  echo "[$(date)] Server started (PID $PID)"
  # Keep alive by pinging every 2s
  for i in $(seq 1 900); do
    sleep 2
    if ! kill -0 $PID 2>/dev/null; then
      echo "[$(date)] Server died, restarting..." >> server-monitor.log
      break
    fi
    curl -s -o /dev/null http://localhost:3000 2>/dev/null
  done
  kill $PID 2>/dev/null
  sleep 2
done