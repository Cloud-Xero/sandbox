```
> [ for s in var.list : upper(s)]
[
  "TANAKA",
  "SATO",
]
> { for s in var.list : s => upper(s) }
{
  "sato" = "SATO"
  "tanaka" = "TANAKA"
}
> [ for k,v in var.map : upper(v) ]
[
  "M5.2XLARGE",
  "T2.MICRO",
  "M5.LARGE",
]
> { for k,v in var.map : v => k }
{
  "m5.2xlarge" = "High"
  "m5.large" = "Mid"
  "t2.micro" = "Low"
}
```
