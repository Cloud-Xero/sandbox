※ open go folder and `cd notion`

#### Weekly

1. Update main.go

   ```go
   monthlyFlag := false
   ```

2. Update config.go

   ```go
   func WeeklyConstants() (string, string) {
      lastWeek := "6/15 ~ 6/21"
      thisWeek := "6/22 ~ 6/30"

      return lastWeek, thisWeek
    }
   ```

3. Execute the following command

   ```bash
   $ make run_update
   ```

#### Monthly

1. Update main.go

   ```go
   monthlyFlag := true
   ```

2. Update config.go

   ```go
   func MonthlyConstants() (string, string) {
      lastMonth := "June"
      thisMonth := "July"

      return lastMonth, thisMonth
    }
   ```

3. Execute the following command

   ```bash
   $ make run_update
   ```

---

## ToDo

- [x] [incomplete] Change the color of weekly label
  - [x] Light Gray → Yellow
  - [x] Yellow → Gray
- [ ] Deal rate limit
- [ ] Update Date
- [ ] Create UI
- [ ] Use Framework (ex. Echo)
