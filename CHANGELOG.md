## 0.4.0 (2025-03-26)

### Feat

- add tsdb backend for logging metrics to central db

### Fix

- ignore backend during serialization
- allow specifying backend to collector

## 0.3.2 (2025-03-25)

### Refactor

- generalize db backend to allow using alternative buffered writers

## 0.3.1 (2025-03-11)

### Fix

- merge id and frame keys when joining dfs

## 0.3.0 (2025-03-02)

### Feat

- add data reader utilities
- add ability to attach metadata to a run id
- expose watermarks as options on Collector class

## 0.2.0 (2025-03-01)

### Feat

- add set_frame method to allow skipping unused intermediate frames

## 0.1.0 (2025-02-23)

### Feat

- add jax io callback for logging within jax.jit
- initial working prototype
- add ability to merge collectors across processes
- don't require next_frame() on first step
- serialize in memory dbs
- initial code migration

### Fix

- remove primary key constraint on frame to support jax.vmap
- allow trailing-edge frames for evaluate
- reset frame counter when changing exp_id
- remove extra next_frame() call
- force a db sync before serialization
- in-memory dbs always need initialization on hydrate
- don't use row_factory for table metadata
- asking for nonexistent measurements gives empty list

### Refactor

- break get_tables into shared utility
- remove dead repeat code from prior version
- make sure collector is cleaned after test
