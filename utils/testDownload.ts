
const testDownload = async (file_size_mb: number, iterations: number) => {
        //const url = `http://192.168.1.3:8000/speedtest/download/${file_size_mb}`
        const url = `${process.env.EXPO_PUBLIC_SPEED_TEST_API_BASE}/download/${file_size_mb}`
        
        let avgSpeed = 0;
        let sum = 0;

        for (let i=0; i<iterations; i++){
            const startTime = performance.now();

            const response = await fetch(url);
            const data = await response.blob();
            const endTime = performance.now();

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            const bytesReceived = file_size_mb * 1000 * 1000;
            const durationSeconds = (endTime - startTime) / 1000;

            const speedBps = bytesReceived / durationSeconds;
            const speedMbps = (speedBps * 8) / (1000 * 1000);

            sum += speedMbps;
        }

        avgSpeed = sum / iterations;
        
        return Math.round(avgSpeed);
}

export default testDownload;