package main

func main() {

	// monthlyFlagがtrueの時、月次処理
	monthlyFlag := false

	if monthlyFlag {

		// Monthly Execution
		// UpdateSelectedMonthlyColor()
		res := GetSelectedMonthData(STATUS_NOT, STATUS_PROGRESS, LAST_MONTH)
		UpdateSelectedMonthData(res, THIS_MONTH)
	}

	// Weekly Execution
	UpdateSelectedWeeklyColor()
	resBody := GetSelectedWeekData()
	UpdateSelectedWeekData(resBody)
}
