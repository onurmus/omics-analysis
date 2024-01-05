# Omics Analyzer

This project consists of a backend and a frontend project namely omics-api and omics-fe. Omics API is a NestJs application and FE is a react app.

These projects are independent so you can run them intependently. Please checkout projects' individual details for installation and run.

## Flow

In the application UI, you have two links, "Gene Visualization" and "Create Experiment" in the header. To create a dummy data, please enter page "Create Experiment".

### Create Experiment

In this page, you need to fill Experiment name, number of samples, Number of Genes and Outlier ratio fields. When you click on "Create mock data" backend service will generate a mock data based on parameters you provided.

The mock data will generate expression values between 120 and 150. However, to generate some outliers, with the probability of outlearRatio, it'll generate expression values between 1 and 190.

The names of the genes will be like "Gene{a number btw 1000 and 51000}"

Sample names will be like "Sample{a number btw 0 and # of samples}"

### Visualization

In the visualization page you need to select an experiment. Then, you'll type some text to search genes. Because of the naming of the genes in the mock data, you can enter some numbers and select more than one genes in the dropdows.

After selecting genes, you need o click on "Get Gene Data" button. This will get the expression values for the genes. Then, you can click on analyze button for the genes in the table. You will see the statistics and a bar chart for expression values.
