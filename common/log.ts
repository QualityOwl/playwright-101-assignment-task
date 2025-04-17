var stepNumber = 1;

export class Log {
    Step(description: string) {
        console.log(`Step # ${(stepNumber <= 9 ? ` ${stepNumber}` : stepNumber)}: ${description}`);

        stepNumber++;
    }

    HeaderText(description: string = 'Test started!') {
        let logText = `======== ${description} ========`;

        console.log(logText);
    }

    FooterText(description: string = 'Test completed!') {
        let logText = `======== ${description} ========`;

        console.log(logText);
    }
}