package com.nd.common;

/**
 * Unicode转换类
 * @author wjy
 *
 */
public class UnicodeUtil {
	/**
	 * 把中文转成Unicode码
	 * @param str
	 * @return
	 */
	public static String chinaToUnicode(String str) {
		StringBuilder sb = new StringBuilder();
		int len = str.length();
		for (int i = 0; i < len; i++) {
			int chr1 = (char) str.charAt(i);
			if (chr1 >= 19968 && chr1 <= 171941) {// 汉字范围 \u4e00-\u9fa5 (中文)
				sb.append("\\u").append(Integer.toHexString(chr1));
			} else {
				sb.append(str.charAt(i));
			}
		}
		return sb.toString();
	}

	/**
	 * 判断是否为中文字符
	 * @param c
	 * @return
	 */
	public boolean isChinese(char c) {
		Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
		if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
				|| ub == Character.UnicodeBlock.GENERAL_PUNCTUATION
				|| ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
				|| ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS) {
			return true;
		}
		return false;
	}

}
