terraform console

[for s in var.list : upper(s)]

{for s in var.list : s => upper(s)}

[for k,v in var.map : upper(v)]

{for k,v in var.map : v => k}
