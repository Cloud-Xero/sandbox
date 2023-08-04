package main

func main() {

	// monthlyFlagがtrueの時、月次処理
	monthlyFlag := true

	// 各種定数を取得
	status1, status2 := CommonConstants()

	if monthlyFlag {

		// Monthly Execution
		lastMonth, thisMonth := MonthlyConstants()
		res := GetSelectedMonthData(status1, status2, lastMonth)
		UpdateSelectedMonthData(res, thisMonth)
		// TODO:カラーを変更する処理の実装
	}

	// Weekly Execution
	lastWeek, thisWeek := WeeklyConstants()
	resBody := GetSelectedWeekData(status1, status2, lastWeek)
	UpdateSelectedWeekData(resBody, thisWeek)
	// TODO:カラーを変更する処理の実装
}
