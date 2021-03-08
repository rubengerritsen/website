---
title: CMake and C++ on Windows
tags: [c++, cmake, windows, boost, eigen3]
description: How to setup a basic C++ project with CMake for scientific computing.
thumbnail: ./dummy.png
---

On this page we discuss how to setup and use a CMake and C++ project to do
scientific computing. The start is a bit tedious, but once you have worked
through the initial setup and installation, it can be reused for any other
project you want to start, so don't despair it is only a one time thing.

# Getting the dependencies

Before we can do anything we need to get and install all the dependencies. In
order we will install

1. Visual Studio (optional if you already have a favorite IDE)
2. CMake
3. Boost
4. Eigen3

## Visual Studio

To write code it is easiest to use an IDE (Integrated Development Environment).
A great IDE for Windows is Visual Studio. Navigate to the [Visual
Studio](https://visualstudio.microsoft.com/) website. Click `Download Visual Studio` and select the community version (it is free!). You can follow the
installer instructions until you get to the `Workloads` window (see the image below), here you need to
select what you want to use Visual Studio for, in our case it will be `Desktop development with C++`, select it and press `install`, you can now follow the
instructions from the installer until the end. It might be necessary to have a
microsoft account to start using Visual Studio, but you can make one for free.

## CMake

CMake is a build tool that takes care of the linking and compilation of a C++ program, so we don't have to worry about it. Navigate to its [download page](https://cmake.org/download/) and select one of the installers, most likely you want the Windows x64 installer, that ends with the `.msi` extension. You can follow the installer instructions, **but make sure to select the option to add CMake to the PATH for all users**.

## Boost

Boost is a very powerful library with many advanced features, it is a bit big
however, so extracting it might take a while. Go to the [boost
website](https://www.boost.org/) and under _Current Release_ click download.
After the download extract the zip file. Probably all the features you need are
within the headers of Boost, this means we don't need to install it, we only
need to copy paste the files to the correct folder. Create a folder in
`C:/Program files` called `boost`, copy paste the `boost_1_75_0` (or whatever
version) folder into the `C:/Program files/boost` folder. Windows might complain
about administrator priviliges, just press okay in this case. This is the whole
installation process of Boost, we don't need anything more. If you, however,
need the more advanced Boost features in the future that require building parts
of boost, you can find more information about it here [Getting Started on
Windows](https://www.boost.org/doc/libs/1_75_0/more/getting_started/windows.html)

## Eigen3

Eigen3 is a very advanced linear algebra library, it also provides data
structures that work in a similar way as NumPy (at least on the surface), it is
very useful for mathematical computations. You can download it from [their
website](https://eigen.tuxfamily.org/index.php?title=Main_Page) under _Get it_
click on the zip file of the latest stable release. After the download, extract
the folder. Now comes the tricky part, we need to install Eigen3 from the
command line with administrator privileges.

To open a powershell press the `Windows Key` + `X`, a menu will appear, select
`Windows PowerShell (Admin)`, now a powershell window will open. Next we need to
navigate to the place where you extracted Eigen3, in my case it is in Downloads,
the exact location (for me) is
`C:/Users/rhjge/Downloads/eigen-3.3.9/eigen-3.3.9`. To get there we use the `cd`
command like this (but obviously with your file location, not mine)

```bash
cd "C:/Users/rhjge/Downloads/eigen-3.3.9/eigen-3.3.9"
```

Now you should be in the correct folder (you can check this by looking at the
path before the `>`, it is something like `PS C:\Users\rhjge\Download\eigen-3.3.9\eigen-3.3.9>`). Next we need to create a
build folder, this is done by typing

```bash
mkdir build
```

This command creates a new folder `build` in the current folder. Next we
navigate into the build folder (`cd build`) and start to build Eigen3. This is
done in two steps, the first is a configuration step, run

```bash
cmake ..
```

This will start to configure Eigen, it will probably spit out many errors and
warnings, in most cases they shouldn't be any problem and can be savely ignored.
Most warnings are about certain packages that are not installed that would make
Eigen even more efficient and fast, you don't need it to develop code. It might
be interesting to look at it though if you run a large computation on a cluster.

Now that eigen is configured it should be installed, this is done by the following command

```bash
cmake --build . --target install
```

If you look at the output of this command you can see exactly where each file is installed.

# Creating the C++ Project

In this section I will assume you use Visual Studio, if you use something else
most things still apply but there are some differences.

Start Visual Studio and select `Create a new project`, next select `CMake Project`, press next and give your project a name, I will call it `example` and
leave the other defaults untouched, next press `Create`. The creation might take
a few seconds. Now you should have an example program, if you look at the right
part of your screen you will see the solution explorer. There are three items, a
folder `out`, a folder `example` (or whatever your project name is) and a
CMakeLists.txt file. In your project folder, there are three files already,
`CMakeLists.txt`, `<yourProjectName>.cpp` and `<yourProjectName>.h`. If you open
`<yourProjectName>.cpp` by clicking on it, you can press the green triangle at
the top and the example program will be build and run.

We won't use the example program generated by Visual Studio, hence you can delete the whole folder with your projects name, leave the outer `CMakeLists.txt` file and the `out` folder untouched.

## Setting up the project

Most C++ projects have a similar basic structure, there is a source folder, containing the `.cpp` source files and an include folder, containing the `.h` files. Let's create this basic structure. Create a `src` and a `include` folder in the main folder of the project (right click on the main folder, select `Add`, `New Folder`). Also create a `main.cpp` file within the `src` folder.

The final layout of the solution explorer should look something like

```text
example (C:\Users\rhjge\source\repos\example)
├── include
├── out
|   └── ... (more stuff)
├── src
│   └── main.cpp
└── CMakeLists.txt
```

## Hello World (with C++ and CMake)

Now that we have the layout setup it is time to build a project. We will build the classic _Hello World_ program as an example. In the `main.cpp` file copy paste the following code.

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    return 0;
}
```

We won't care much about what the code means, for that follow a basic tutorial on the internet,
what we will focus on here is how to build and compile it with CMake.

Open the `CMakeLists.txt` file and copy paste the following code into it. I have
added many comments to explain what every line does, read them carefully. This
file is used to tell CMake how to build and compile the program we are creating.

```cmake
# does what it says, it sets the minimum required version to 3.8
cmake_minimum_required (VERSION 3.8)

# set the projects name
project ("example")

# There are many different C++ versions labeled by their release year
# here we will use the one from 2014 for compatibility with the VOTCA-XTP project.
# You are free to use a more recent C++ version if you need the features
set(CMAKE_CXX_STANDARD 14)
# If 14 is not available we want an error, this is done by setting it as required
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Here we specify the folders where the compiler should look for include files.
# We have created an include folder specifically for this purpose, so we add it here
include_directories(include)

# To make compilation easy we want CMake to look for all possible .cpp files that should be compiled
# We do this with a "GLOB", a way of writing generic file names. For example the GLOB "src/*.cpp" translates to
# every file in the src folder that ends with .cpp, the asterix (*) is called a wild card, it matches
# any possible string.
file(GLOB SOURCES "src/*.cpp")
# after this command all source files are collected in the variable SOURCES

# Now we create an executable (the actual program) named example, we want it to use all the source files.
# We need ${variable} to access the contents of a variable, hence ${SOURCES} gives all the sources
# collected with the GLOB expression above.
add_executable (example ${SOURCES})
```

If you now navigate to the main.cpp file and press the play button (green triangle) your program will build and run.

# Using Eigen, Boost and OpenMP

Now that we know how to build a very basic program with CMake and C++ let's look at how to use libraries. We will compile a program that does some simpe linear algebra, format strings using boost and do a parallel for loop. You can copy past it into `main.cpp`.

```cpp

#include <iostream>
#include <Eigen/Dense> // Needed to acces Eigen3's vectors and matrices
#include <boost/format.hpp> // Needed to acces Boosts formatter
#include <omp.h> // Needed for the parallel tools from OpenMP

int main(){
  /*****************/
  /* USING EIGEN 3 */
  /*****************/
  // create a 3-vector (1,2,3)
  Eigen::Vector3d vec;
  vec << 1,2,3;
  std::cout << "Print the vector" << std::endl;
  std::cout << vec << std::endl;
  // create a 3x3 matrix
  Eigen::Matrix3d mat;
  mat << 1,2,3,4,5,6,7,8,9;
  std::cout << "Print the matrix" << std::endl;
  std::cout << mat << std::endl;
  // Compute the product
  std::cout << "This is their product" << std::endl;
  std::cout << mat * vec << std::endl;

  /*****************/
  /* USING BOOST   */
  /*****************/
  std::cout << boost::format("This will be a formatted number: %1.4f") %
                 1.67329587;

  /**************************/
  /* An OpenMP EXAMPLE      */
  /**************************/
  const int size = 25600;
  double sinTable[size];

  // We use half the available threads, just to see what it does in the task
  // manager or htop. For a heavy application you would want to use as many as possible
  int maxThreads = omp_get_max_threads();
  int nrOfThreadsToUse = maxThreads / 2;
  #pragma omp parallel for num_threads(nrOfThreadsToUse)
  for (int n = 0; n < size; ++n) {
    // What we do here is useless, but it takes some time
    // so you can inspect windows task manager (windows), debug panel or htop(Linux)
    // to see that the for loop is run over multiple cores at the same time.
    sinTable[n] = std::sin(2 * 3.14 * n / size);
    for (int n2 = 0; n2 < size; ++n2) {
      sinTable[n] += std::sin(2 * 3.14 * n / size) + n2;
    }
  }

}
```

To use Boost, Eigen and OpenMP, we need to let CMake know that we want to use
these libraries, this is done with the following `CMakeLists.txt` file. I have
added comments to all new commands.

```cmake
cmake_minimum_required (VERSION 3.8)
project ("example")

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Windows is not so nice with the structure of include files and libraries
# Hence we need to help it a bit to find boost, on UNIX/LINUX systems we don't need this
# NB Check if the path here actually points to a boost installation folder, otherwise it won't work
# I installed it in my `Program files` as suggested above
if (WIN32) # WIN32 is true on a windows system
    set(Boost_INCLUDE_DIR "C:/Program files/boost/boost_1_75_0")
endif (WIN32)

# The nice thing about CMake is that it can find dependecies for us and handle
# the linking and include files, to find a package we do the following
find_package(Eigen3 3.3 REQUIRED)
find_package(Boost REQUIRED)
find_package(OpenMP)

# Besides our own include directory also Boost has one, since we used CMake to
# find the package for us, the include folder is stored in ${Boost_INCLUDE_DIRS}
# so our include directories are our own include directory and the Boost ones.
include_directories(include ${Boost_INCLUDE_DIRS})

file(GLOB SOURCES "src/*.cpp")
add_executable (example ${SOURCES})

# Since we use external libraries, we need to link our executable to them.
# Here we link agains Eigen, Boost and OpenMP.
# The PUBLIC keyword is used to specify the type of interface, in most cases PUBLIC
# will be fine.
target_link_libraries(example PUBLIC Eigen3::Eigen ${Boost_LIBRARIES} OpenMP::OpenMP_CXX)

```

If you navigate to `main.cpp` now and press the play button, your code will compile and run. See what it does and you can start to play around with it.


# Why did we do all this stuff?
With the CMake file above, CMake automatically searches for new header files in the include directories, including our own `include` directory and for new source files (`.cpp`) in the `src` directory. Hence using CMake linking and compiling will from now on always be just a single push of the button. CMake will search for then new files, compile and link them against the necessary libraries. We do no longer need to do any of this stuff manually.