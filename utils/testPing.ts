const testPing = async (iterations: number) => {
    //const url = "http://192.168.1.3:8000/speedtest/ping";
    const url = `${process.env.EXPO_PUBLIC_SPEED_TEST_API_BASE}/ping`

    let sum = 0;
    let avgDuration = 0;

    for(let i=0; i<iterations; i++){
        const startTime = performance.now();
        const response = await fetch(url);
        const endTime = performance.now();

            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const duration = endTime - startTime;
        sum += duration;
    }

    avgDuration = sum / iterations;

    return Math.round(avgDuration);
}

export default testPing;