---
title: Organizing Code
tags: [python, largeproject]
description: Functional and Procedural programming, python modules.
thumbnail: ../dummy.png
---

# Introduction
As you start to write more and more code, it becomes important to organize that code. There are many ways to do this and many levels on which you can organize. Here we will treat two, a functional/procedural approach for programming and python modules for spreading code over multiple files.

# Functional and Procedural Programming
The mathematical idea of a function is probably well known, you have some f(x), that outputs a value y. In programming we also have functions but it is important to realize that they are very different from mathematical functions. As an example the mathematical function y=f(x) has a clear input x and a clear output y, f itself won't do anything strange to any other variables, in computer science this is called a pure function. 

Now take a look at the following piece of code and try to run it.

```python
number = 0

def square(x):
    global number
    number += 123
    return x * x

print(f"number: {number}")
print(f"the square of {3.3} is {square(3.3)}")
print(f"number: {number}")
```

Here we have a "function" that does what a math function does (i.e. take input and output something), but it also changes the global variable `number`. This is called a side effect of a function. The use of pure functions is known as functional programming and the use of functions with side effects is known as procedural programming (in a language such as C it is not uncommon to write functions that only have side effects and no outputs this is where the keyword `void` is used). Both functional and procedural programming can help you in organizing your code. Consider the following very basic example (that won't work).

```python
def firstForce(pos):
  """ Some force computation. """
  return force

def computeAcceleration(pos):
  """ A difficult formula to compute the acceleration. """
  global mass
  force = firstForce(pos) + secondForce(pos) + ...
  return force/mass

def integrator(pos, vel, dt):
  """ I just made this up, doesn't do anything! """
  a = computeAcceleration(pos)
  vel += a *dt
  return pos + vel * dt + a * dt * dt

while (t <= endTime):
  x[i+1], v[i+1] = integrator(x[i], v[i], dt)
  t += dt
```

Splitting the program in functions makes the program very easy to understand. You almost don't need any comments because your function titles tell you what every piece of code does. This style for structuring code is well liked by many people, but obviously not the only way. You are free to take whatever approach you like.

 > disclaimer: I hope it is obvious that this small discussion of functional and procedural programming is in no way exhaustive. There is way more to it, but that also lies way beyond the scope of this course.

# Multiple Files (Python modules)

For all the details have a look at the [documentation](https://docs.python.org/3/tutorial/modules.html). Here we present a minimal example.

You can bundle python functions in modules. Modules are simply python files (i.e. `<name>.py`) with a collection of functions, an example `forces.py`

```python
def forceOne():
  return 1

def forceTwo():
  return 2
```

If you have this file saved, then in another python file (in the same directory) you can call this file with the `import` command.

```python
import forces # note you import only the file name without the extension

print(forces.forceOne())
```

If you want to use a function from a module you need to use the `.`, accessing the function `forceOne()` from the module `forces` is done via `forces.forceOne()`. Sometimes your filename is to long and you don't want to type it as a name for a module. Than you can use the `as` keyword, which you already know from `import numpy as np`.