---
title: Ordering of orbitals in VOTCA, ORCA and MOLDEN
date: "2020-07-30"
tags: [votca-xtp, votca, orbitals, dft, quantumchemistry, molden]
thumbnail:  
description: Notes on the storage of orbitals in quantum chemistry packages and standard file types, such as ORCA, MOLDEN and VOTCA.
---

# Ordering of orbitals in VOTCA, ORCA and MOLDEN
| VOTCA         | ORCA          | MOLDEN        |
|---------------|---------------|---------------|
| $s$           | $s$           | $s$           |
| $p_z$         | $p_z$         | $p_x$         |
| $p_y$         | $p_x$         | $p_y$         |
| $p_x$         | $p_y$         | $p_z$         |
| $d_{z^2}$     | $d_{z^2}$     | $d_{z^2}$     |
| $d_{yz}$      | $d_{xz}$      | $d_{xz}$      |
| $d_{xz}$      | $d_{yz}$      | $d_{yz}$      |
| $d_{xy}$      | $d_{x^2-y^2}$ | $d_{x^2-y^2}$ |
| $d_{x^2-y^2}$ | $d_{xy}$      | $d_{xy}$      |
| $f_{0}$       | $f_{0}$       | $f_{0}$       |
| $f_{-1}$      | $f_{+1}$      | $f_{+1}$      |
| $f_{+1}$      | $f_{-1}$      | $f_{-1}$      |
| $f_{-2}$      | $f_{+2}$      | $f_{+2}$      |
| $f_{+2}$      | $f_{-2}$      | $f_{-2}$      |
| $f_{-3}$      | $f_{+3}$      | $f_{+3}$      |
| $f_{+3}$      | $f_{-3}$      | $f_{-3}$      |
| $g_{0}$       | $g_{0}$       | $g_{0}$       |
| $g_{-1}$      | $g_{+1}$      | $g_{+1}$      |
| $g_{+1}$      | $g_{-1}$      | $g_{-1}$      |
| $g_{-2}$      | $g_{+2}$      | $g_{+2}$      |
| $g_{+2}$      | $g_{-2}$      | $g_{-2}$      |
| $g_{-3}$      | $g_{+3}$      | $g_{+3}$      |
| $g_{+3}$      | $g_{-3}$      | $g_{-3}$      |
| $g_{-4}$      | $g_{+4}$      | $g_{+4}$      |
| $g_{+4}$      | $g_{-4}$      | $g_{-4}$      |