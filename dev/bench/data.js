window.BENCHMARK_DATA = {
  "lastUpdate": 1740340811051,
  "repoUrl": "https://github.com/rlai-lab/ml-instrumentation",
  "entries": {
    "Python Benchmark with pytest-benchmark": [
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "andnp",
            "username": "andnp"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "0c23edd46a1755cc70c99a1153e64ee3dca9f57e",
          "message": "ci: add initial tooling script",
          "timestamp": "2024-08-30T10:03:49-06:00",
          "tree_id": "f57234b160fc0a02a95d6dd63d171e03fc13d81d",
          "url": "https://github.com/andnp/ml-instrumentation-archived/commit/0c23edd46a1755cc70c99a1153e64ee3dca9f57e"
        },
        "date": 1725398755068,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 147.83268446516956,
            "unit": "iter/sec",
            "range": "stddev: 0.0020886163795779695",
            "extra": "mean: 6.764403985612581 msec\nrounds: 139"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 98.26454549470019,
            "unit": "iter/sec",
            "range": "stddev: 0.0018986335864449437",
            "extra": "mean: 10.17661044444493 msec\nrounds: 63"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 435.2041153743879,
            "unit": "iter/sec",
            "range": "stddev: 0.0011753717758067983",
            "extra": "mean: 2.2977723892609374 msec\nrounds: 447"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 428.4347293752265,
            "unit": "iter/sec",
            "range": "stddev: 0.001247918561975883",
            "extra": "mean: 2.3340778219783207 msec\nrounds: 455"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d1f69ac18ab62f191d1e4db225c5dd4347c89766",
          "message": "chore: add link to performance benchmarks",
          "timestamp": "2024-09-03T15:27:24-06:00",
          "tree_id": "2c75e6010c0325e87f7291cb50c1b2a978d5fb31",
          "url": "https://github.com/andnp/ml-instrumentation/commit/d1f69ac18ab62f191d1e4db225c5dd4347c89766"
        },
        "date": 1725398872547,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 150.15066043249777,
            "unit": "iter/sec",
            "range": "stddev: 0.0018448178558078158",
            "extra": "mean: 6.659977366197222 msec\nrounds: 142"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 110.28544753497071,
            "unit": "iter/sec",
            "range": "stddev: 0.001701711163992968",
            "extra": "mean: 9.067379444444901 msec\nrounds: 63"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 457.26502427331656,
            "unit": "iter/sec",
            "range": "stddev: 0.0008371125921450778",
            "extra": "mean: 2.1869155673762615 msec\nrounds: 423"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 465.5815141044911,
            "unit": "iter/sec",
            "range": "stddev: 0.00001807038789483753",
            "extra": "mean: 2.147851600000529 msec\nrounds: 85"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "f4859c451c0fc25abd5ff9a374cc4633697371f3",
          "message": "chore: separate benchmarks onto new line",
          "timestamp": "2024-09-03T15:27:50-06:00",
          "tree_id": "686af02234c0a8446d673f446d920753ea2826da",
          "url": "https://github.com/andnp/ml-instrumentation/commit/f4859c451c0fc25abd5ff9a374cc4633697371f3"
        },
        "date": 1725398896835,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 153.43170846110422,
            "unit": "iter/sec",
            "range": "stddev: 0.0014888778743222004",
            "extra": "mean: 6.51755761589206 msec\nrounds: 151"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 107.74150235868652,
            "unit": "iter/sec",
            "range": "stddev: 0.0018875604224101474",
            "extra": "mean: 9.281474437500048 msec\nrounds: 64"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 461.7882922643476,
            "unit": "iter/sec",
            "range": "stddev: 0.0006332886566742504",
            "extra": "mean: 2.1654944847054645 msec\nrounds: 425"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 445.61991111201,
            "unit": "iter/sec",
            "range": "stddev: 0.0006945299242495214",
            "extra": "mean: 2.2440648971554644 msec\nrounds: 457"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "338baf3dafc85eb8076523d8eacb6a8da9c34b6f",
          "message": "Merge pull request #3 from andnp/dependabot/pip/deps-e5bd3890c3\n\nchore(deps): update numpy requirement from <=2.1.0,>=1.26 to >=1.26,<=2.1.1 in the deps group",
          "timestamp": "2024-09-09T09:07:49-06:00",
          "tree_id": "8687d34dc9726d91f692c08a19ecda4ba998722b",
          "url": "https://github.com/andnp/ml-instrumentation/commit/338baf3dafc85eb8076523d8eacb6a8da9c34b6f"
        },
        "date": 1725894498255,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 153.69669982753177,
            "unit": "iter/sec",
            "range": "stddev: 0.0019630607151080747",
            "extra": "mean: 6.506320572413941 msec\nrounds: 145"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 112.54349825388064,
            "unit": "iter/sec",
            "range": "stddev: 0.0021731179450522136",
            "extra": "mean: 8.885453318184187 msec\nrounds: 66"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 448.7505967523076,
            "unit": "iter/sec",
            "range": "stddev: 0.0009873535471919097",
            "extra": "mean: 2.2284092929061 msec\nrounds: 437"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 449.68372474680797,
            "unit": "iter/sec",
            "range": "stddev: 0.0010061673999587765",
            "extra": "mean: 2.2237851738197656 msec\nrounds: 466"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "6ee31e6ccf43d9a1a38999bd67b00f85e4aaeac1",
          "message": "test: ensure frame is correctly restored after serde",
          "timestamp": "2024-10-31T09:46:00-06:00",
          "tree_id": "1906287573e68f6e39097b552f98f9f58733074b",
          "url": "https://github.com/andnp/ml-instrumentation/commit/6ee31e6ccf43d9a1a38999bd67b00f85e4aaeac1"
        },
        "date": 1730389586293,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 150.1981105255072,
            "unit": "iter/sec",
            "range": "stddev: 0.0022932625454372196",
            "extra": "mean: 6.657873368055295 msec\nrounds: 144"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 111.42812476645278,
            "unit": "iter/sec",
            "range": "stddev: 0.002191249915146302",
            "extra": "mean: 8.974394948276702 msec\nrounds: 58"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 444.8725721557972,
            "unit": "iter/sec",
            "range": "stddev: 0.0011896674833861824",
            "extra": "mean: 2.2478346892777052 msec\nrounds: 457"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 438.63181897457434,
            "unit": "iter/sec",
            "range": "stddev: 0.0012156038617847367",
            "extra": "mean: 2.2798163670337055 msec\nrounds: 455"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "91a5e2045545734daca1cc6a8602fe3c297aab61",
          "message": "chore(deps): update numpy requirement\n\nUpdates the requirements on [numpy](https://github.com/numpy/numpy) to permit the latest version.\n\nUpdates `numpy` to 2.2.1\n- [Release notes](https://github.com/numpy/numpy/releases)\n- [Changelog](https://github.com/numpy/numpy/blob/main/doc/RELEASE_WALKTHROUGH.rst)\n- [Commits](https://github.com/numpy/numpy/compare/v1.26.0...v2.2.1)\n\n---\nupdated-dependencies:\n- dependency-name: numpy\n  dependency-type: direct:production\n  dependency-group: deps\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
          "timestamp": "2025-01-31T23:06:20-07:00",
          "tree_id": "6acca63d8c59c18a0db13327c54b14db3ffa8787",
          "url": "https://github.com/andnp/ml-instrumentation/commit/91a5e2045545734daca1cc6a8602fe3c297aab61"
        },
        "date": 1738390006375,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 157.51550177446254,
            "unit": "iter/sec",
            "range": "stddev: 0.0020081924020270655",
            "extra": "mean: 6.34858149664433 msec\nrounds: 149"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 103.1009909763213,
            "unit": "iter/sec",
            "range": "stddev: 0.003878650239026512",
            "extra": "mean: 9.699227820513046 msec\nrounds: 39"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 442.6034095305022,
            "unit": "iter/sec",
            "range": "stddev: 0.0009213493556449707",
            "extra": "mean: 2.259359007335177 msec\nrounds: 409"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 441.467178456385,
            "unit": "iter/sec",
            "range": "stddev: 0.0010261207600099809",
            "extra": "mean: 2.2651740577783306 msec\nrounds: 450"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "8c37f1f9363f5544c5d362c0a110f94c18feffa0",
          "message": "chore(deps): update numpy requirement in the deps group\n\nUpdates the requirements on [numpy](https://github.com/numpy/numpy) to permit the latest version.\n\nUpdates `numpy` to 2.2.2\n- [Release notes](https://github.com/numpy/numpy/releases)\n- [Changelog](https://github.com/numpy/numpy/blob/main/doc/RELEASE_WALKTHROUGH.rst)\n- [Commits](https://github.com/numpy/numpy/compare/v1.26.0...v2.2.2)\n\n---\nupdated-dependencies:\n- dependency-name: numpy\n  dependency-type: direct:production\n  dependency-group: deps\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
          "timestamp": "2025-02-02T15:10:53-07:00",
          "tree_id": "2cbd60c72f2cefb7b3bd762f3117d4da779d1812",
          "url": "https://github.com/rlai-lab/ml-instrumentation/commit/8c37f1f9363f5544c5d362c0a110f94c18feffa0"
        },
        "date": 1738534281932,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 159.04869910845616,
            "unit": "iter/sec",
            "range": "stddev: 0.0015829124959833038",
            "extra": "mean: 6.287382453333331 msec\nrounds: 150"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 99.0029996842914,
            "unit": "iter/sec",
            "range": "stddev: 0.00233768529597036",
            "extra": "mean: 10.100704051280054 msec\nrounds: 39"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 446.4047857856421,
            "unit": "iter/sec",
            "range": "stddev: 0.0007693362240792025",
            "extra": "mean: 2.2401193532010817 msec\nrounds: 453"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 437.34228112650743,
            "unit": "iter/sec",
            "range": "stddev: 0.0009322669043073897",
            "extra": "mean: 2.2865385835190626 msec\nrounds: 449"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "cecff6c8c4437d4d695e5e64b96000b34992ea42",
          "message": "ci: ensure jax is installed for ci tests",
          "timestamp": "2025-02-09T21:53:04-07:00",
          "tree_id": "9c263ecad3195d9644126bf6e4dd5d1a65718702",
          "url": "https://github.com/rlai-lab/ml-instrumentation/commit/cecff6c8c4437d4d695e5e64b96000b34992ea42"
        },
        "date": 1739163211337,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 152.46928288011105,
            "unit": "iter/sec",
            "range": "stddev: 0.004051800140601157",
            "extra": "mean: 6.5586981266667035 msec\nrounds: 150"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 101.83870840356346,
            "unit": "iter/sec",
            "range": "stddev: 0.0038778233931684816",
            "extra": "mean: 9.81944896666628 msec\nrounds: 60"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 432.9150667712967,
            "unit": "iter/sec",
            "range": "stddev: 0.001916712300179731",
            "extra": "mean: 2.309921914841293 msec\nrounds: 411"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 426.27828538350275,
            "unit": "iter/sec",
            "range": "stddev: 0.0020169059533950207",
            "extra": "mean: 2.3458853858820103 msec\nrounds: 425"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e0349725c3d2f893e781eb44b39c084012166c5d",
          "message": "docs: update installation instructions",
          "timestamp": "2025-02-12T15:33:26-07:00",
          "tree_id": "30cb819a674a345b7487dcc3b0f3a3d12d0b19d5",
          "url": "https://github.com/rlai-lab/ml-instrumentation/commit/e0349725c3d2f893e781eb44b39c084012166c5d"
        },
        "date": 1739399632182,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 145.51600822704341,
            "unit": "iter/sec",
            "range": "stddev: 0.005527162631104493",
            "extra": "mean: 6.872096150684232 msec\nrounds: 146"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 100.35303224573202,
            "unit": "iter/sec",
            "range": "stddev: 0.0048854280476245925",
            "extra": "mean: 9.964820968750843 msec\nrounds: 64"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 417.9386448569604,
            "unit": "iter/sec",
            "range": "stddev: 0.0024066234672945144",
            "extra": "mean: 2.392695703797026 msec\nrounds: 395"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 417.9667200459725,
            "unit": "iter/sec",
            "range": "stddev: 0.0023533904981153267",
            "extra": "mean: 2.3925349843404016 msec\nrounds: 447"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "b06e4b8958e78750297df177b3aa2fd0f191709b",
          "message": "chore(deps): update numpy requirement in the deps group\n\nUpdates the requirements on [numpy](https://github.com/numpy/numpy) to permit the latest version.\n\nUpdates `numpy` to 2.2.3\n- [Release notes](https://github.com/numpy/numpy/releases)\n- [Changelog](https://github.com/numpy/numpy/blob/main/doc/RELEASE_WALKTHROUGH.rst)\n- [Commits](https://github.com/numpy/numpy/compare/v1.26.0...v2.2.3)\n\n---\nupdated-dependencies:\n- dependency-name: numpy\n  dependency-type: direct:production\n  dependency-group: deps\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>",
          "timestamp": "2025-02-17T13:21:08-07:00",
          "tree_id": "966826925c6da205612a928d582d821163a5e81a",
          "url": "https://github.com/rlai-lab/ml-instrumentation/commit/b06e4b8958e78750297df177b3aa2fd0f191709b"
        },
        "date": 1739823693833,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 154.41806848287206,
            "unit": "iter/sec",
            "range": "stddev: 0.003465915599098772",
            "extra": "mean: 6.475926100001175 msec\nrounds: 150"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 109.96116245799452,
            "unit": "iter/sec",
            "range": "stddev: 0.002963036947334464",
            "extra": "mean: 9.094119938773863 msec\nrounds: 49"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 428.7855354371891,
            "unit": "iter/sec",
            "range": "stddev: 0.0017932081651801585",
            "extra": "mean: 2.3321682224667435 msec\nrounds: 454"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 431.4690378150857,
            "unit": "iter/sec",
            "range": "stddev: 0.0016310599813556992",
            "extra": "mean: 2.317663406542207 msec\nrounds: 428"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andnpatterson@gmail.com",
            "name": "andnp",
            "username": "andnp"
          },
          "committer": {
            "email": "andnpatterson@gmail.com",
            "name": "Andy Patterson",
            "username": "andnp"
          },
          "distinct": true,
          "id": "c980365f9b93505c0d653683d93b7c8c5a0b757c",
          "message": "chore: remove unused testing and publication scripts",
          "timestamp": "2025-02-23T12:59:23-07:00",
          "tree_id": "7c01c74c7102bb8e979bcfc5b0cd559289107ec4",
          "url": "https://github.com/rlai-lab/ml-instrumentation/commit/c980365f9b93505c0d653683d93b7c8c5a0b757c"
        },
        "date": 1740340791029,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 143.983504832242,
            "unit": "iter/sec",
            "range": "stddev: 0.00518599218763374",
            "extra": "mean: 6.945240020133692 msec\nrounds: 149"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 92.81247321924535,
            "unit": "iter/sec",
            "range": "stddev: 0.006283495794267211",
            "extra": "mean: 10.774413883333978 msec\nrounds: 60"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 441.24304753621743,
            "unit": "iter/sec",
            "range": "stddev: 0.001715577581499257",
            "extra": "mean: 2.2663246607141603 msec\nrounds: 448"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 416.7820862093629,
            "unit": "iter/sec",
            "range": "stddev: 0.0024144451568701973",
            "extra": "mean: 2.3993353675418483 msec\nrounds: 419"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "committer": {
            "email": "github-actions[bot]@users.noreply.github.com",
            "name": "github-actions[bot]",
            "username": "github-actions[bot]"
          },
          "distinct": true,
          "id": "433a7d31306edb0dbbc1024771e03055ff91aaca",
          "message": "bump: version 0.0.0 → 0.1.0",
          "timestamp": "2025-02-23T19:59:46Z",
          "tree_id": "f3c0c2ab3d510be3c1b691663fb846b394c32ebe",
          "url": "https://github.com/rlai-lab/ml-instrumentation/commit/433a7d31306edb0dbbc1024771e03055ff91aaca"
        },
        "date": 1740340810775,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[basic_collector]",
            "value": 154.83994561040376,
            "unit": "iter/sec",
            "range": "stddev: 0.003368096506300047",
            "extra": "mean: 6.458281782894204 msec\nrounds: 152"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_write_path1[disk_collector]",
            "value": 101.54012006818569,
            "unit": "iter/sec",
            "range": "stddev: 0.004096337789333807",
            "extra": "mean: 9.84832398591301 msec\nrounds: 71"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[basic_collector]",
            "value": 436.2283942308146,
            "unit": "iter/sec",
            "range": "stddev: 0.001676966868804551",
            "extra": "mean: 2.2923771428571564 msec\nrounds: 455"
          },
          {
            "name": "tests/performance/test_Collector.py::test_benchmark_read1[disk_collector]",
            "value": 440.92996355947275,
            "unit": "iter/sec",
            "range": "stddev: 0.0013838246245778316",
            "extra": "mean: 2.2679338730517453 msec\nrounds: 449"
          }
        ]
      }
    ]
  }
}