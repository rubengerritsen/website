---
title: Unit Testing in VOTCA 
description: Unit Testing in VOTCA
---


# Using The Tests
To enable tests run `cmake -DENABLE_TESTING=ON` and then `make` to actually build them or compile VOTCA with the option enabled.

```bash
cmake -DBUILD_CSGAPPS=ON -DBUILD_XTP=ON -DENABLE_TESTING=ON` -DCMAKE_INSTALL_PREFIX=${prefix} ..
cmake --build . -- -j<number of cores>
cmake --build . --target install
```

To run all the unit tests, simply run `make test`. Or if you only want to run one specific test run `ctest -R <name_of_test>`. `ctest` also has a nice option to get the output from a test displayed if the test fails `--output-on-failure`, this is very useful if you are debugging or writing a test. This output can also be redirected to a file for later inspection.

```bash
ctest -R <name_of_test> --output-on-failure > <log_name>.log
```

# Making A Test

A test needs a source file, in votca-xtp generally named `test_<name_of_test>.cc`, which lives in the `<where_xtp_is>/src/tests` directory. `cmake` needs to know that the test exists, this is done by adding the line `list(APPEND test_<name_of_test>)` to the `CMakeLists.txt` file in the tests directory. Optional data files for the test can be stored in the  `<where_xtp_is>/src/tests/DataFiles/<name_of_test>` directory.

# Usefull tools while making a test

## Write Eigen Matrix to File

```cpp
#include <votca/tools/eigenio_matrixmarket.h>

votca::tools::EigenIO_MatrixMarket::WriteMatrix(
      std::string(XTP_TEST_DATA_FOLDER) + "/<folder_in_DataFiles>/<matrix_name>.mm",
      <matrixToWriteToFile>);
```

## Read Eigen Matrix from File

```cpp
#include <votca/tools/eigenio_matrixmarket.h>

Eigen::MatrixXd matrix = votca::tools::EigenIO_MatrixMarket::ReadMatrix(
      std::string(XTP_TEST_DATA_FOLDER) + "/<folder_in_DataFiles>/<matrix_name>.mm",
      orbitalsReference.MOs().eigenvectors());
```

## Compare Eigen Matrices

```cpp
bool checkEqual = eigenMatrix1.isApprox(eigenMatrix2, tolerance);
```