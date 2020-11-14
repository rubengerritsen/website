---
title: Testing Latex Support
description: Description
---

In this chapter we introduce the main ideas of the many-body theory of
molecular systems. This theory is used to compute geometries and the
electronic structure, including spectra, of molecules. We will firstly
introduce the part of many-body theory that is relevant for molecules,
the theory of many-electron systems, one of the most important
approximations in the theory and one of the first approaches to solving
the many-electron problem. Thereafter we will discuss three important,
more modern, approaches for solving parts of the problem. The first is
Density Functional Theory (DFT) a method that is good in predicting
ground state properties of materials. The second is known as $GW$-BSE
which deals well with excited states and the third method is
time-dependent DFT (TDDFT), which is also used for excited state
calculations.

Many-Electron Systems
=====================

From a chemistry perspective all materials are surprisingly similar on
the nanoscale, they consist of only two different types of particles
(bodies), the atomic nuclei $l$ of mass $M_l$, charge $Z_l$ and at
position $\mathbf{R}_l$ and electrons $i$ with mass $m$, charge $-e$,
spin $\sigma_i$ and position $\mathbf{r}_i$. Furthermore there is
predominantly only one interaction between the particles namely the
electrostatic or Coulomb interaction. The potential corresponding to
this interaction for a particle with unit charge at the origin is

$$
  v(\mathbf{r})=\frac{1}{\left\lVert\mathbf{r}\right\rVert},  \tag{1} 
$$

where we assumed atomic units, i.e.
$m_e = e = \hbar = 4 \pi \epsilon_0 = 1$. The state of the system is
described by a wavefunction $\Psi(x,t)$, where $x$ contains all
time-independent variables (i.e.
$x = \{\{\mathbf{r}_i, \sigma_i\},\ \{Z_l,R_l\}\}$) and $t$
represents time. The dynamics of the system are governed by the system's
Hamiltonian $\hat{H}_\text{sys}$ via the Schrödinger equation

$$
  i\frac{\partial \Psi}{\partial t} = \hat{H}_\text{sys} \Psi,  \tag{2} 
$$

with $\hat{H}_\text{sys}$ given by

$$
  
\begin{aligned}
\hat{H}_\text{sys} =& \frac{1}{2}\sum_l \frac{1}{M_l}P_l^2 +  \frac{1}{2}\sum_i p_i^2 + \frac{1}{2}\sum_{\substack{l,l' \\(l \neq l')}} Z_lZ_{l'} v(R_l - R_{l'})\\
&-\sum_l\sum_i Z_l v(r_i-R_l) + \frac{1}{2}\sum_{\substack{i,i' \\(i \neq i')}} v(r_i - r_{i'}),
\end{aligned}  \tag{3} 
$$

where we introduced the momentum operators $P_l = -i\nabla_{R_l}$
and $p_i = -i\nabla_{r_i}$. In equation (3) we have from left to
right, the kinetic energy of the nuclei, the kinetic energy of the
electrons, the nucleus-nucleus interactions, the nucleus-electron
interactions and finally the electron-electron interactions. Note that
the Hamiltonian (3) does not depend on time. We therefore split the
wavefunction in a product of spatial and temporal terms, i.e.
$\Psi(x,t) = \Psi(x)f(t)$. This allows us to apply separation of
variables

$$
  i\frac{1}{f(t)}\frac{\partial f}{\partial t} = \frac{1}{\Psi(x)}\hat{H}_\text{sys} \Psi(x),  \tag{4} 
$$

and since the left side only depends on $t$ and the right only on $x$,
both sides must be equal to a constant. This constant is the energy $E$
of the system, solving both parts separately gives the time-independent
Schrödinger equation

$$
  
\hat{H}_\text{sys} \Psi(\{\mathbf{r}_i, \sigma_i\},\ \{Z_l,R_l\}) = E\Psi(\{\mathbf{r}_i, \sigma_i\},\ \{Z_l,R_l\})  \tag{5} 
$$

and the time evolution of the system

$$
  f(t) = e^{-iEt}.  \tag{6} 
$$

Since the Hamiltonian does not depend on the spin of the electrons, we
will ignore the spin of the electrons for now and reintroduce it when it
is necessary (i.e. $\Psi = \Psi(\{\mathbf{r}_i\},\ \{Z_l,R_l\})$).

In principle all properties (geometric structure, spectra etc.) of the
system can be computed from equation (5). In practice however we run
into problems quickly. Due to all the interacting terms, equation (5)
forms a system of coupled differential equations that cannot be split
into smaller systems and the number of variables in the system is large.
For example, a single benzene molecule, see Figure
[\[benzene\]](#benzene){reference-type="ref" reference="benzene"}, with
12 nuclei and 42 electrons already leads to a problem of 162 spatial
variables. Therefore solving equation (5) for any reasonable molecule is
impossible no matter what numerical methods are used.
