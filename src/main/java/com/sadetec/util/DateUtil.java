package com.sadetec.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;


public class DateUtil {
	/**
	 * 转换日期格式为字符串
	 * 
	 * @param date
	 *            待转换日期
	 * @return 格式为'yyyy-MM-dd'的字符串
	 */
	public static String toString(Date date) {
		if (date == null)
			return new String();
		return new SimpleDateFormat("yyyy-MM-dd").format(date);
	}

	/**
	 * 获取某月的最后一天
	 * 
	 * @param date
	 *            输入的日期
	 * @return 该日期对应月份的最后一天日期
	 */
	public static Date getLastDateOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}

	/**
	 * 获取两个日期之间的月份差值
	 * 
	 * @param date1
	 *            输入的日期1
	 * @param date2
	 *            输入的日期2
	 * @return (日期2-日期1)月份的差值
	 */
	public static int months(Date date1, Date date2) {
		Calendar cal1 = Calendar.getInstance(), cal2 = Calendar.getInstance();
		cal1.setTime(date1);
		cal2.setTime(date2);
		return 12 * (cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR)) + cal2.get(Calendar.MONTH)
				- cal1.get(Calendar.MONTH);
	}
	/**
	 * 获取两个日期之间的季度差值
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static int quarters(Date date1, Date date2) {
		Calendar cal1 = Calendar.getInstance(), cal2 = Calendar.getInstance();
		cal1.setTime(date1);
		cal2.setTime(date2);
		return (12 * (cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR)) + cal2.get(Calendar.MONTH)
		- cal1.get(Calendar.MONTH))/4;
	}
	/**
	 * 获取两个日期之间的年度差值
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static int years(Date date1, Date date2) {
		Calendar cal1 = Calendar.getInstance(), cal2 = Calendar.getInstance();
		cal1.setTime(date1);
		cal2.setTime(date2);
		return  (cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR));
	}
	/**
	 * 获取两个日期之间的天数差值
	 * 
	 * @param date1
	 *            输入的日期1
	 * @param date2
	 *            输入的日期2
	 * @return (日期2-日期1)天数的差值
	 */

	public static int days(Date date1, Date date2) {
		Calendar cal1 = Calendar.getInstance(), cal2 = Calendar.getInstance();
		cal1.setTime(date1);
		cal2.setTime(date2);
		int days = (int) ((cal2.getTimeInMillis() - cal1.getTimeInMillis()) / 1000 / 60 / 60 / 24);
		if (days == 0 && date2.before(date1)) {
			days = -1;
		}
		return days;
	}

	/**
	 * 返回某天增加或删减天数后的日期
	 * 
	 * @param date
	 *            输入的日期
	 * @param days
	 *            需增加的天数
	 * @return 新日期
	 */
	public static Date addDays(Date date, int days) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, days);
		return cal.getTime();
	}

	/**
	 * 返回某天增加或删减月份后的日期
	 * 
	 * @param date
	 * @param months
	 * @return
	 */
	public static Date addMonths(Date date, int months) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, months);
		return cal.getTime();
	}

	/**
	 * 获取对应日期的一年的最后一天
	 * 
	 * @param date
	 *            输入的日期
	 * @return 该日期所在年份的最后一天
	 */
	public static Date getLastDayOfYear(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.MONTH, Calendar.DECEMBER);
		cal.set(Calendar.DAY_OF_MONTH, 31);
		return cal.getTime();
	}

	/**
	 * 获取下个月的第一天
	 * 
	 * @param date
	 *            输入的日期
	 * @return 该日期对应的下个月的第一天
	 */
	public static Date getFirstDateOfNextMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		return cal.getTime();
	}

	/**
	 * 获取输入月的第一天
	 * 
	 * @param date
	 *            输入的日期
	 * @return 该日期对应的该月第一天
	 */
	public static Date getFirstDateOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		return cal.getTime();
	}

	public static Date getFirstDateOfMonth(int month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, month - 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		return cal.getTime();
	}

	/**
	 * 获取对应日期的明年的最后一天
	 * 
	 * @param date
	 *            输入的日期
	 * @return 该日期下一年的最后一天
	 */
	public static Date getLastDayOfNextYear(Date date) {
		Date _date = getLastDayOfYear(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(_date);
		cal.add(Calendar.YEAR, 1);
		return cal.getTime();
	}

	/**
	 * 减一天 TODO 未完成
	 * 
	 * @return
	 */
	public static Date removeOneDay(Date date) {
		Calendar d = Calendar.getInstance();
		d.setTime(date);
		d.add(Calendar.DATE, -1);
		return d.getTime();
	}

	/**
	 * 获取当年的第一天
	 * 
	 * @return 当年的第一天日期
	 */
	public static Date getFirstDayOfYear() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, Calendar.JANUARY);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		return cal.getTime();
	}

	/**
	 * 返回后两个月的最后一天
	 * 
	 * @param date
	 *            操作的日期
	 * @return 该日期后两个月的最后一天日期
	 */
	public static Date getNextThreeMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		if (cal.get(Calendar.MONTH) >= 8)
			cal.set(Calendar.MONTH, 11);
		else
			cal.add(Calendar.MONTH, 3);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}

	/**
	 * 获取对应月份的最后一天
	 * 
	 * @param month
	 *            月份(1-12)
	 * @return 对应月份的最后一天
	 */
	public static Date getLastDateOfMonth(int month) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, month - 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return DateUtil.getLastDateOfMonth(cal.getTime());
	}

	/**
	 * 获取对应时间的月份
	 * 
	 * @param date
	 *            输入时间
	 * @return 该时间的月份 1-12
	 */
	public static int getMonthOfDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.MONTH) + 1;
	}

	/**
	 * 获取对应时间的日期
	 * 
	 * @param date
	 *            输入时间
	 * @return 日 1-(28~31)
	 */
	public static int getDayOfDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获取对应时间的年份
	 * 
	 * @param date
	 *            输入时间
	 * @return 年份yyyy
	 */
	public static int getYearOfDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.YEAR);
	}

	/**
	 * 获取两个日期间最大日期
	 * 
	 * @param date1
	 *            日期1
	 * @param date2
	 *            日期2
	 * @return 大的日期
	 */
	public static Date getMaxDate(Date date1, Date date2) {
		return date1.after(date2) ? date1 : date2;
	}

	/**
	 * 比较两个日期是否是同一天
	 * 
	 * @param date1
	 *            日期1
	 * @param date2
	 *            日期2
	 * @return
	 */
	public static boolean equals(Date date1, Date date2) {
		Calendar cal1 = Calendar.getInstance(), cal2 = Calendar.getInstance();
		cal1.setTime(date1);
		cal2.setTime(date2);
		return (cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR))
				&& (cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH))
				&& (cal1.get(Calendar.DATE) == cal2.get(Calendar.DATE));
	}

	/**
	 * 获取现在时间
	 * 
	 * @return返回短时间格式 yyyy-MM-dd /** 获取现在时间
	 * 
	 * @return返回字符串格式 yyyy-MM-dd HH:mm:ss
	 */
	public static String getStringDate() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(currentTime);
		return dateString;
	}

	/**
	 * 获取现在时间
	 * 
	 * @return 返回短时间字符串格式yyyy-MM-dd
	 */
	public static String getStringDateShort() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(currentTime);
		return dateString;
	}

	/**
	 * 获取时间 小时:分;秒 HH:mm:ss
	 * 
	 * @return
	 */
	public static String getTimeShort() {
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
		Date currentTime = new Date();
		String dateString = formatter.format(currentTime);
		return dateString;
	}

	public static String getTimeShort(Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
		String dateString = formatter.format(date);
		return dateString;
	}

	/**
	 * 将长时间格式时间转换为字符串 yyyy-MM-dd HH:mm:ss
	 * 
	 * @param dateDate
	 * @return
	 */
	public static String dateToStrLong(java.util.Date dateDate) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(dateDate);
		return dateString;
	}

	/**
	 * 将长时间格式时间转换为字符串 HH:mm:ss
	 * 
	 * @param dateDate
	 * @return
	 */
	public static String dateToStrShort(java.util.Date dateDate) {
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
		String dateString = formatter.format(dateDate);
		return dateString;
	}

	/**
	 * 将短时间格式时间转换为字符串 yyyy-MM-dd
	 * 
	 * @param dateDate
	 * @param k
	 * @return
	 */
	public static String dateToStr(java.util.Date dateDate) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(dateDate);
		return dateString;
	}
	
	public static String dateToStr(java.util.Date dateDate, String format) {
		if(null == dateDate) {
			return null;
		}
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		String dateString = formatter.format(dateDate);
		return dateString;
	}

	public static double calHourDiff(String startDate, String endDate) {
		long start = fromDateStringToLong(startDate);
		long end = fromDateStringToLong(endDate);
		long mint = (end - start) / (1000);
		double d = (double) ((double) mint / 3600);
		System.out.println("d==" + d);
		BigDecimal bg = new BigDecimal(d);
		double dt = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dt;
	}

	public static long fromDateStringToLong(String inVal) {
		Date date = null;
		SimpleDateFormat inputFormat = new SimpleDateFormat("HH:mm:ss");
		try {
			date = inputFormat.parse(inVal);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date.getTime();
	}

	public static long fromDateStringToShort(String inVal) {
		Date date = null;
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = inputFormat.parse(inVal);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return date.getTime();
	}
	/**
	 * 得到年月的最后一天
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static String getLastDay(int year, int month) {
		String lastDate = "";
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		int end = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
		if (month <= 9) {
			lastDate = year + "-" + "0" + month + "-" + end;
		} else {
			lastDate = year + "-" + month + "-" + end;
		}
		return lastDate;
	}

	/**
	 * 获取现在时间
	 * 
	 * @return 返回短时间字符串格式yyyyMM
	 */
	public static String getYearMonth(int year, int month) {
		String yearMonth = "";
		if (month <= 9) {
			yearMonth = year + "0" + month;
		} else {
			yearMonth = year + "" + month;
		}
		return yearMonth;
	}

	public static int getYear(Date cur_date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(cur_date);
		int year = calendar.get(Calendar.YEAR);
		return year;
	}

	public static int getMonth(Date cur_date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(cur_date);
		int month = calendar.get(Calendar.MONTH) + 1;
		return month;
	}

	public static int getLastCalYear(int year, int month) {
		int lastcalYear = 0;
		if (month == 1) {
			lastcalYear = year - 1;
		} else {
			lastcalYear = year;
		}
		return lastcalYear;
	}

	public static int getLastCalMonth(int year, int month) {
		int lastcalMonth = 0;
		if (month == 1) {
			lastcalMonth = 12;
		} else {
			lastcalMonth = month - 1;
		}
		return lastcalMonth;
	}

	public static int getLastCalMonth(Date cur_date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(cur_date);
		int month = calendar.get(Calendar.MONTH) + 1;
		return month;
	}

	public static List<Date> getDateByWeekRepeat(Date startDate, Date endDate, String repeatDays) {
		List<Date> list = new ArrayList<Date>();
		int days = days(startDate, endDate);
		for (int i = 0; i <= days; i++) {
			Date date = addDays(startDate, i);
			if (repeatDays.indexOf(date.getDay() + "") != -1) {
				list.add(date);
			}
		}
		return list;
	}

	public static Date strToDateTime(String str) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = null;
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return date;
	}
	public static Date strToDate(String str) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return date;
	}

	public static final String PATTERN_CALENDAR = "yyyy-MM-dd";

	public static final String PATTERN_TIME = "yyyy-MM-dd HH:mm:ss";

	private static final Collection<String> DEFAULT_PATTERNS = Arrays.asList(new String[] { PATTERN_CALENDAR,
			PATTERN_TIME });

	private static final Date DEFAULT_TWO_DIGIT_YEAR_START;

	static {
		Calendar calendar = Calendar.getInstance();
		calendar.set(2000, Calendar.JANUARY, 1, 0, 0);
		DEFAULT_TWO_DIGIT_YEAR_START = calendar.getTime();
	}

	public static Date parseDate(String dateValue) {
		return parseDate(dateValue, null, null);
	}

	public static Date parseDate(String dateValue, Collection<String> dateFormats, Date startDate) {
		if (dateValue == null) {
			return null;
		}
		if (dateFormats == null) {
			dateFormats = DEFAULT_PATTERNS;
		}
		if (startDate == null) {
			startDate = DEFAULT_TWO_DIGIT_YEAR_START;
		}
		if (dateValue.length() > 1 && dateValue.startsWith("'") && dateValue.endsWith("'")) {
			dateValue = dateValue.substring(1, dateValue.length() - 1);
		}

		SimpleDateFormat dateParser = null;
		for (String format : dateFormats) {
			if (dateParser == null) {
				dateParser = new SimpleDateFormat(format);
			} else {
				dateParser.applyPattern(format);
			}
			try {
				return dateParser.parse(dateValue);
			} catch (ParseException pe) {
			}
		}
		return null;
	}

	public static int getMintues(String dateA, String dateB) {
		long dayNumber = 0;
		long mins = 60L * 1000L;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			java.util.Date d1 = df.parse(dateA);
			java.util.Date d2 = df.parse(dateB);
			dayNumber = (d2.getTime() - d1.getTime()) / mins;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (int) dayNumber;
	}

	public static int getMintues(Date dateStart, Date dateEnd) {
		long dayNumber = 0;
		long mins = 60L * 1000L;
		try {
			dayNumber = (dateEnd.getTime() - dateStart.getTime()) / mins;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (int) dayNumber;
	}
	public static void main(String[] args) {
	}
}
