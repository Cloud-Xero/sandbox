package main

func main() {

	// monthlyFlagが1の時、月次処理
	monthlyFlag := true

	// 各種定数を取得
	status1, status2 := CommonConstants()

	if monthlyFlag {

		// Monthly Execution
		lastMonth, thisMonth := MonthlyConstants()
		res := GetSelectedMonthData(status1, status2, lastMonth)
		UpdateSelectedMonthData(res, thisMonth)
	}

	// Weekly Execution
	lastWeek, thisWeek := WeeklyConstants()
	resBody := GetSelectedWeekData(status1, status2, lastWeek)
	UpdateSelectedWeekData(resBody, thisWeek)
}
