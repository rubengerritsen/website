---
title: Numpy Basics
tags: [python, numpy, spyder, basics]
description: A brief overview of the most important numpy features for Scientific Computing.
thumbnail: ../dummy.png
---

# Introduction
NumPy is an extension of python specifically designed for doing numeric computations. The two main features of the package are its fast array class and a large library of efficient mathematical functions. The two keywords here are *fast* and *efficient*, if we want to do large simulations (a 1000 atoms or more) performance of our software matters a lot. It can make the difference between a computation of a few hours and a few days. To illustrate this point I have made an example program that compares three different implementations, run it and see the difference.

```python
import time as timer
import numpy as np


""" Naive implementation of the sum from 0 to 5000000. """
startTime = timer.time()
cumSum = 0
for i in range(5000001): # note the plus 1, why is it there?
    cumSum += i
naiveDuration = timer.time() - startTime
print(f"answer: {cumSum}, duration: {naiveDuration}s")

""" NumPy implementation of the sum from 0 to 5000000. """
startTime = timer.time()
cumSum = np.sum(np.arange(5000001))
numpyDuration =  timer.time()  - startTime
print(f"answer: {cumSum}, duration: {numpyDuration}s")
    
""" Mathematicians implementation of the sum from 0 to 5000000 """
startTime = timer.time()
cumSum = (5000000)*(5000000+1)/2
mathDuration =  timer.time()  - startTime
print(f"answer: {cumSum}, duration: {mathDuration}s")
print("")
print(f"Numpy is {naiveDuration/numpyDuration} times faster than normal python")
```

There are multiple things we should learn from this example. Firstly that the NumPy implementation is about 40 to 50 times faster (at least on my machine) than the naive python implementation. Secondly that the use of the NumPy functions has made the code shorter, more readable and easier to understand. Thirdly that we can do without for-loops in most cases if you use NumPy functions. The most important step in getting performance from Python is trying to **avoid the use of for-loops**. Finally that we should never forget that there might be better alternatives than brute force methods or as Linus Torvalds and David Diamond put it:

 > A great mathematician doesn't solve a problem the long and boring way because he sees what the real pattern is behind the question, and applies that pattern to find the answer in a much better way. The same is definitely true in computer science, too. Sure, you can just write a program that calculates the sum. On today's computers that would be a snap. But a great programmer would know what the answer is simply by being clever. He would know to write a beautiful program that attacks the problem in a new way that, in the end, is the right way. (from: Just for Fun)

Now that we have seen the two main benefits (speed and readability) of NumPy let's dive in. We will start with the basic NumPy data structure, the ndarray, and so called broadcasting rules. At the end we present some of the mathematical functions in NumPy.

# The NDArray
Ndarrays are simple arrays, they allow only one data type (e.g. you can't mix strings and numbers), but you can have multiple dimensions, dimensions are called axes. So a simple 3D vector [1, 1, 1] is an ndarray with one axis and three elements. The 3D unit matrix has 2 axes and is represented as

```python
[[1, 0, 0], 
 [0, 1, 0], 
 [0, 0, 1]]
```
the new lines are optional, matrices and tensors can also be defined on a single line.

To convert the representation into an ndarray we need to call the `np.array()` function. Try the following examples in the interactive python console to get a feel for this array type.
```python
>>> import numpy as np

>>> a = np.array([1,2,3,4,5,6,7,8,9]) # a is now an ndarray
>>> a.size # returns the number of elements
>>> a.shape # returns the shape in a tuple

>>> b = a.reshape(3,3) # return a 3x3 matrix with the elements from a
>>> b.shape
>>> b.size 

>>> b[1,2] = 100
>>> print(b)
>>> print(a) # is this expected behaviour?
```
Note how `a` changed when we changed `b`, the ndarray returns in principle a *reference* to the original data if a function such as `reshape` gets called. This is very useful because copying data is very slow and in most cases you just want to pass data to a function or rename a variable or change the shape anyway. However, sometimes you do want a copy, that can be achieved with the `copy()` function.

```python
>>> b = a. reshape(3,3).copy()
>>> b[2,2] = 10000
>>> print(b)
>>> print(a)
```
Be aware of this fact, it is a mistake that is often made by beginner programmers to think that you have a copy while you actually only have a reference to data.

## Indexing NDArrays
To show you what we can do with indexing let's make a cube of indices

```python
>>> cube = np.arange(27).reshape(3,3,3)
>>> print(cube) # you actually don't need the print >>> cube works fine
>>> cube[:,1,:] # this is called slicing for obvious reasons
>>> cube[1,0:2,:] # part of a slice
>>> cube[0,0,0]
```
Indexing behaves as expected the `[begin:end]` construct works the same as for lists, we can use `:` to get all data along an axis (i.e. dimension) and we use normal numbers to index a specific row, column etc.

> Note that there is an important difference between indexing multidimensional NDArrays and Python lists. A "matrix" in python list format is indexed as `mat[i][j]`, for NDArrays we have  `mat[i,j]`.

## Advanced Indexing
Numpy allows for indexing with a boolean array
```python
booleanArray = np.array([False,False,True,True,True,False])
a = np.array([1,2,3,4,5,6])
print(a[booleanArray])
```
Or with an index array
```python
indexArray = np.array([4,4,4,1,2,2,2,1,1])
a = np.array([1,2,3,4,5,6])
print(a[indexArray])
```
An example use case for the boolean array; get all elements greater than 3
```python
a = np.array([1,2,3,4,5,6])
print(a>3)
print(a[a>3])
```

## Doing Arithmetic
All arithmetic is done elementwise.
```python
>>> a = np.array([1,2,3,4]) 
>>> b = np.array([7,3,9,0])
>>> a-b
>>> a*b
>>> 3 * a
>>> 2 ** a
```
If you want to do more advance things like a dot product, NumPy has functions for those, see the linear algebra part of this tutorial.

## Basic Math Functions
```python
np.sin(a) # gives the sine of a, elementwise
np.exp(a) # gives the exp of a, elementwise
np.arccos(a) # gives the arccos of a, elementwise etc.
```
and many more, if you can think it, it probably exists.

# Advanced NumPy Trickery
One of the most useful features for MD is the `np.newaxis` function.
```python
masses = np.array([3,6,3,2,5,3])
velocity = np.array([ [1,3,2],
                       [1,3.3,2],
                       [1.1,3,2],
                       [1.2,3,2],
                       [1,3,2.6],
                       [1,3,2.3] ])
print(3 * masses) # simple broadcasting
print(4 * velocity) # simple broadcasting
print(masses[:,np.newaxis] * velocity) # advanced broadcasting
```
The first two print lines follow the rule that everything goes elementwise in NumPy. With the `np.newaxis` command we can do more advanced stuff. In this case it tells NumPy that while multiplying it should "broadcast" (expand) the mass over the velocity vector. This is done by changing the shape of masses slightly, `[:,np.newaxis]` should be read as: get all data (`:`) and add a new axis over which NumPy will broadcast (`np.newaxis`). Since the data had a shape of `(6,)` after the `np.newaxis` it will have a shape of `(6,1)` if you multiply this by an array of shape `(6,3)` NumPy will broadcast the 1 dimension to the 3 you need for the multiplication. Note that in most other programming languages we need a for-loop to achieve the same effect.

## Computing Pair Data
Suppose I have an array `a = np.array([1,2,3,4])` and I want the difference between all possible pairs. In a normal programming language you would write a double for-loop, something like
```python
for i in a:
    for j in a:
        print(i - j)
```
In python however this is ridiculously slow for larger arrays. Luckily we have the `np.newaxis` command, try this `a - a[:, np.newaxis]` it should give you 
```python
[[ 0  1  2  3]
 [-1  0  1  2]
 [-2 -1  0  1]
 [-3 -2 -1  0]]
```
See what has happend here, since we have a new axis to broadcast over, the subtraction has been broadcast over that new axis. This matrix give us the difference between `a[i]` and `a[j]` in entry (i,j). This also works if `a` is an array of vectors or matrices, try it out!

> At this point you should be smiling, because this little trick allows you to compute pair data within one line of code instead of multiple for-loops, imagine how you could use this to compute distances (in week 1) or shared parameters (once you are working on Lennard Jones potentials, week 5).

## Broadcasting of Functions
Also most functions can be broadcasted over certain axes, in general the `axis` keyword argument is used for this purpose. As an example here is how to compute the 2-norm of an array of vectors along different axis.
```python
velocity = np.array([ [1,3,2],
                       [1,3.3,2],
                       [1.1,3,2],
                       [1.2,3,2],
                       [1,3,2.6],
                       [1,3,2.3] ])
# one number, the frobenius norm of  a matrix
print(np.linalg.norm(velocity)) 
# 2-norm taken along the first (zeroth) axis results in three numbers one for every column
print(np.linalg.norm(velocity, axis=0)) 
 # 2-norm taken along the second axis results in six numbers one for every row
print(np.linalg.norm(velocity, axis=1))
```

# Buffered vs Unbuffered Addition in NumPy
**This is a bit hard, but very important to know!**

There are two types of addition in NumPy, buffered and unbuffered. In principle buffered addition is used, an example
```python
>>> a = np.array([1,2,3])
>>> a[[1,1]] += 3 # buffered addition
[1, 5, 3] # this is the output
```
I have used an index array here `[1,1]` is an index array with twice the index 1, what has happend is that 3 is added only once to index 1 even though it occurred 2 times. This is the default **buffered** behaviour of NumPy. 

There are often situations in which this buffering is undesirable (you will encounter these situations if you want to add multiple forces to multiple indices, i.e. atoms, starting from week 4). To get unbuffered addition we need to use the `np.add.at` functionality of NumPy, an example

```python
>>> a = np.array([1,2,3])
>>> np.add.at(a, [1,1], 3) # Unbuffered addition
[1,8,3]
```

# Useful functions from the NumPy library
Just glance over the following functions so you know they exist and you can google their details.


## Linear Algebra
```python
np.linalg.norm() # computes the 2-norm other norms are possible
A @ B            # if A and B are matrices than @ will give the matrix product
a.dot(b)         # if a and b are vector this gives the dot product
np.dot(a,b)      # also a dot product
a.cross(b)       # the cross product i.e. a x b
np.cross(a,b)    # the cross product i.e. a x b
```
### Einstein sums
In physics there is something called the Einstein sum convention which allows you to write sums over indices very succinctly, Wikipedia it if you like. Numpy has implemented this sum convention. In this course we have only one use for it. Suppose we have two arrays of position vectors, `a` and `b` and we want the innerproducts between the ith element of `a` and the ith element of `b` for all i. Then we can use the follow version of the Einstein sum in NumPy to accomplish this.
```
np.einsum('ij,ij->i', a, b)
```
## Miscellaneous functions
```python
np.sum(array)           # sum of array (can also be done per axis)
np.floor(array)         # floors all values in array
np.sign(array)          # returns an array of 1's and -1's
np.append(array, thing) # append thing to array
np.nan_to_num(array)    # converts all NaN's to some number can be set with optional kwargs
np.histogram(array)     # bin data, like making a histogram
```

## Generating NDArrays (zeros, ones and random data)
```python
np.empty([4,2,3]) # generates an empty (random) NDArray with shape (4,2,3)
np.zeros([4,2,3]) # generates an NDArray filled with zeros with shape (4,2,3)
np.ones([4,2,3])  # just guess

np.linspace(start, end, size) # generates an array from start to end with "size" equally spaced elements

np.array([1,2,3,4]) # A normal NDArray
np.int32([1,2,3,4]) # An NDArray with internal type int32
```

# And Way More
NumPy can do way more, but you probably won't need much more than covered here. If you are interested though, have a look at their tutorial [here](https://numpy.org/devdocs/user/quickstart.html).