package main

func main() {

	// monthlyFlagがtrueの時、月次処理
	monthlyFlag := false

	if monthlyFlag {

		// Monthly Execution
		// UpdateSelectedMonthlyColor()
		res := GetSelectedMonthData()
		UpdateSelectedMonthData(res)
	}

	// Weekly Execution
	UpdateSelectedWeeklyColor()
	resBody := GetSelectedWeekData()
	UpdateSelectedWeekData(resBody)
}
