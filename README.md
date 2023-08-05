# Log Parser Project - description:

This Node.js project is designed to parse incoming logs from an `app.log` file, adhering to SOLID principles and utilizing TypeScript for type safety.
    - Single Responsibility Principle (SRP): The project separates concerns with dedicated modules for logging, log parsing, and log processing, ensuring each component has a single, well-defined responsibility.

    - Open-Closed Principle (OCP): It follows the OCP by allowing easy extension of services like log parsing through dependency injection and interfaces without modifying existing code.

    -  Interface Segregation Principle (ISP): The project defines clean and focused interfaces, like ILogger and ILogParser, preventing fat interfaces and ensuring classes implement only the methods relevant to them.

    - Dependency Inversion Principle (DIP): Dependency injection is used to inject instances of services like ILogger and ILogParser, promoting loose coupling and facilitating testing and flexibility.

    can support large files: tested with 2.832.000 lines (then vscode encountered OOM)

## Getting Started

To get started with this project, follow these steps:

1. **Installation**:

   To install project dependencies, run the following command:

   ```bash
   npm install

2. **Compilation** 

    Use the following command to compile TypeScript filesL: 

    ```
    npx tsc
    ```

3. **Execution**


    To execute the parser run the following command:
    ```
        node src/main.js --input {inputFile} --output {outputFile}
        node src/main.js --input ./app.log --output ./errors.json
    ```

4. **Run tests**

    npm run test 