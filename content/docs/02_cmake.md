---
title: CMake and C++ for Scientific Computing
tags: [c++, cmake]
description: How to setup a basic C++ project with CMake for scientific computing.
thumbnail: ./dummy.png
---

C++ is a great language for scientific computing. For most people, however, getting started with C++ is a big hurdle. Most people think that it is hard to setup a C++ project and write correct/nice code. With the use of CMake and the Eigen and Boost libraries however, developing a C++ project for a scientific computing task will be almost as easy as writing a Python project with NumPy.

The only thing that is a bit more involved is the initial setup. On the following two pages I will show you how to get started with a CMake project on both windows and Linux. 

The libraries we will use are

 * [Boost](https://www.boost.org/) for general functions, like string formatting and file system access
 * [Eigen](https://eigen.tuxfamily.org/index.php?title=Main_Page) it is a library for linear algebra, but can be thought of as a NumPy equivalent for C++.
 * [OpenMP](https://www.openmp.org/) a very friendly API for parallel programming
