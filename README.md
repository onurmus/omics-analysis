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

In the visualization page you need to select an experiment. Then you have two options:

#### Get Outliers

There is a simple service which calculates outliers based on z-score threshold. You can set a z-score threshold and click on `Get Outliers` button. Once you clicked, you will see a table showing genes having outliers and samples giving outliers.

#### Visualize Gene Expression Data

Under Outliers table, you can visualize gene expression data. You need to type some text to search genes. Because of the naming of the genes in the mock data, you can enter some numbers and select more than one genes in the dropdows.

After selecting genes, you need o click on "Get Gene Data" button. This will get the expression values for the genes. The system will draw an heatmap for the selected genes, too.

Once you click on analyze button for the genes in the table, you will see the statistics and a skatter plot for expression values.

## Mock Data

If you want to observe the structure of the data please check the [dummy data](https://github.com/onurmus/omics-analysis/tree/main/omics-api/dummyData) that I created.
