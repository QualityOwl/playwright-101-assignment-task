export class Log {
    private stepNumber = 1;
    private readonly buffer: string[] = [];

    constructor(private readonly testTitle: string) { }

    Step(description: string) {
        const line = `Step # ${(this.stepNumber <= 9 ? ` ${this.stepNumber}` : this.stepNumber)}: ${description}`;
        this.buffer.push(line);
        this.stepNumber++;
    }

    // Print all buffered lines for a given test.
    flush(status: string) {
        if (!this.buffer.length) return;

        console.log(`\r\n==== START: ${this.testTitle} [${status.toUpperCase()}] ====`);
        this.buffer.forEach(l => console.log(l));
        console.log(`==== END:   ${this.testTitle} [${status.toUpperCase()}] ====`);
    }

    TestRunStart(description: string = 'Test Run Started!') {
        //console.log(`======== ${description} ========`);
    }

    TestRunFooter(description: string = 'Test Run Completed!') {
        //console.log(`======== ${description} ========`);
    }
}
