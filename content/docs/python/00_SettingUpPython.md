---
title: Setting Up Python  
tags: [install, python, anaconda]
description: How to install python
thumbnail: ../dummy.png
---

# Introduction
In this course we will build a Molecular Dynamics (MD) engine in python 3. On this page we will show you how to setup python 3 and the packages we need. We expect you to have a working python 3 installation (including the necessary packages) at the start of the course.

Chances are you already have everything installed. We will be using the [Anaconda](https://www.anaconda.com/products/individual) bundle for python that contains python 3 and all required packages. It is the same python distribution as used in the Data Analytics for Engineers (2IAB0) course. If you already have Anaconda installed, go through the example on the next page and see if everything still works.

We do not require you to use Anaconda. If you want to manage your own python installation and the required packages, you may do so. Note, however, that it might be hard (or even impossible) for us to support you if you run into problems this way. Furthermore check out the minimal python requirements for this course at the end of this page and make sure the example on the next page works with your python installation.

# Installing Anaconda

1. Go to the [Anaconda](https://www.anaconda.com/products/individual) website.
2. Under products select individual edition, press the download button and click the version of Anaconda applicable for your system (most likely the 64-bit installer for windows).
3. Once the installer is downloaded, run it.
4. **IMPORTANT**: Once you get to the Advanced Options in the installer make sure the `Add Anaconda3 to my PATH` option is unchecked and the same for the `Register Anaconda3 as my default ...` option.  If these options are checked they might interfere with other installed software.
5. Next, press `Install` and wait.
6. Now that you have Anaconda installed, you can try it out with the example code on the next page.


# Managing Your Own Python Installation

## Minimal Python Requirements
You need to have python **3**. You will also need to have the following packages installed

 * `numpy` provides functions for number crunching,
 * `scipy` a scientific library for python and
 * `matplotlib` a library for making plots.

You will also need a good text editor or IDE.

## A Quick Way of Setting Things Up For Windows Users
If you choose to manage your own python installation, but have never done so before, here is a quick way of getting started.

1. Press `WIN` + `X` on your keyboard followed by `I`, this will open a powershell.
2. Type python3 and press enter, if you have python 3 installed the command line now starts with `>>>`, you can exit again with `exit()`. If python 3 is not installed, powershell will guide you to the microsoft store, where you can download/get python3. Press the button and let windows take care of the rest
3. Next we need to setup the packages. Go to a powershell again and use the following command `pip3 install <package_name>` where you replace `<package_name>` with the right package name.

## For Linux Users
Almost all Linux distros come with python pre-installed. You only need to install the right packages with `pip3 install <package_name>`.

## Getting A Text Editor or IDE
To write code you will need a text editor or IDE (integrated development environment). If you do not have your own favorite text editor, [Visual Studio Code (VS Code)](https://code.visualstudio.com/) comes highly recommended. Just visit their website and install it. Once installed make sure to check out and install their python extension (search for `ms-python` in the extensions bar), it will give you syntax highlighting, automatic code formatting, code suggestions and a play button to run python code (it even allows you to run python notebooks within VS Code).



