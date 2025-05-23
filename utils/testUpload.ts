
const testUpload = async (file_size_mb: number, iterations: number) => {

    //const url = `http://192.168.1.3:8000/speedtest/upload/${file_size_mb}`
    const url = `${process.env.EXPO_PUBLIC_SPEED_TEST_API_BASE}/upload/${file_size_mb}`
    const data = new Uint8Array(file_size_mb * 1000 * 1000).fill(49)

    let avgSpeed = 0;
    let sum = 0;

    for (let i=0; i<iterations; i++) {
        const startTime = performance.now();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Length": String(file_size_mb * 1000 * 1000),
                "Cache-Control": "no-cache"
            },
            body: data
        });

        const result = await response.json();
        const endTime = performance.now();

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const bytesSent = file_size_mb * 1000 * 1000;
        const durationSeconds = (endTime - startTime) / 1000;

        const speedBps = bytesSent / durationSeconds;
        const speedMbps = (speedBps * 8) / (1000 * 1000);

        sum += speedMbps
    }

    avgSpeed = sum / iterations;

    return Math.round(avgSpeed);
}

export default testUpload;
