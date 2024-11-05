const ws = new WebSocket("ws://localhost:3000/ws");

ws.addEventListener('open', () => {
    setInterval(() => {
        ws.send(new Date().toString())
    }, 1000)
})