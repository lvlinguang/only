package com.only.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import com.only.model.common.Json;

public class HttpRequest {

	/**
	 * 向指定URL发送GET方法的请求
	 * 
	 * @param url
	 *            发送请求的URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return URL 所代表远程资源的响应结果
	 */
	public static String sendGet(String url, String param, String cookies) {
		String result = "";
		BufferedReader in = null;
		try {
			String urlNameString = url + "?" + param;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			if ("" != cookies) {

				// 设置cookie
				connection.setRequestProperty("Cookie", cookies);
			}

			// 建立实际的连接
			connection.connect();
			// // 获取所有响应头字段
			// Map<String, List<String>> map = connection.getHeaderFields();
			// // 遍历所有的响应头字段
			// for (String key : map.keySet()) {
			// System.out.println(key + "--->" + map.get(key));
			// }

			// 定义 BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			result = e.getMessage();
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return 所代表远程资源的响应结果
	 */
	public static String sendPost(String url, String param, String cookies) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			if ("" != cookies) {

				// 设置cookie
				conn.setRequestProperty("Cookie", cookies);
			}

			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}

			// // 获取所有响应头字段
			// Map<String, List<String>> map = conn.getHeaderFields();
			// // 遍历所有的响应头字段
			// for (String key : map.keySet()) {
			// System.out.println(key + "--->" + map.get(key));
			// }

		} catch (Exception e) {
			System.out.println("发送 POST 请求出现异常！" + e);
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 加入购物车
	 */
	public static Json addCart(String url, String param, String cookies) {

		Json json = new Json();

		BufferedReader in = null;

		try {

			String urlNameString = url + "?" + param;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			if ("" != cookies) {

				// 设置cookie
				connection.setRequestProperty("Cookie", cookies);
			}

			// 建立实际的连接
			connection.connect();

			// 得到cookies
			List<String> result1 = getCookies(connection.getHeaderFields());

			List<String> result = new ArrayList<String>();
			result.add(result1.get(0));

			// 定义 BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			String content = "";
			while ((line = in.readLine()) != null) {
				content += line;
			}

			Pattern p = Pattern.compile("submitcode\" value=\"(.+)\">");
			Matcher m = p.matcher(content);

			String value = "";

			while (m.find()) {

				value = m.group(0).replace("submitcode", "").replace("value=", "").replace("\"", "").trim();
			}
			int strindex = value.indexOf(">");
			value = value.substring(0, strindex);

			result.add(value);

			json.setSuccess(true);
			json.setMsg("添加成功");
			json.setObject(result);

		} catch (Exception e) {

			json.setSuccess(false);
			json.setMsg(e.getMessage());
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return json;
	}

	/**
	 * 得到验证码
	 */
	public static Json getCode(String url, String param) {

		Json json = new Json();

		InputStream is = null;

		try {

			String urlNameString = url + "?" + param;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			// 建立实际的连接
			connection.connect();

			// 得到cookies
			List<String> result1 = getCookies(connection.getHeaderFields());

			// 图片下载
			is = connection.getInputStream();

			byte[] data = inputbyte(is);

			String xmldata = RuoKuai.createByPost2("1327492577", "QQQwww111.", "3040", "90", "1", "b40ffbee5c1cf4e38028c197eb2fc751", data);

			// 验证码
			String code = displayXmlResult(xmldata);

			List<String> result = new ArrayList<String>();
			result.add(result1.get(0));
			result.add(code);

			json.setSuccess(true);
			json.setMsg("返回成功");
			json.setObject(result);

		} catch (Exception e) {
			json.setSuccess(false);
			json.setMsg(e.getMessage());
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (is != null) {
					is.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return json;
	}

	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return 所代表远程资源的响应结果
	 */
	public static Json sendLogion(String url, String param, String cookies) {

		Json json = new Json();

		PrintWriter out = null;

		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			if ("" != cookies) {

				// 设置cookie
				conn.setRequestProperty("Cookie", cookies);
			}

			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);

			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();

			// 定义BufferedReader输入流来读取URL的响应
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			String text = "";
			while ((line = in.readLine()) != null) {
				text += line;
			}

			in.close();

			// 得到cookies
			List<String> result = getCookies(conn.getHeaderFields());

			if (result.size() != 0) {
				json.setSuccess(true);
				json.setMsg("登录成功");
				json.setObject(result);
			} else {
				json.setSuccess(false);
				json.setMsg(text);
			}

		} catch (Exception e) {
			json.setSuccess(false);
			json.setMsg(e.getMessage());
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			if (out != null) {
				out.close();
			}
		}
		return json;
	}

	/**
	 * 注册
	 */
	public static Json sendRegister(String url, String param, String cookies) {

		Json json = new Json();

		PrintWriter out = null;

		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			if ("" != cookies) {

				// 设置cookie
				conn.setRequestProperty("Cookie", cookies);
			}

			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);

			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();

			// 定义BufferedReader输入流来读取URL的响应
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			String text = "";
			while ((line = in.readLine()) != null) {
				text += line;
			}

			in.close();

			// 得到cookies
			List<String> result = getCookies(conn.getHeaderFields());

			if (result.size() != 0) {

				json.setSuccess(true);
				json.setObject(result.get(0));
			}
			// 解析html内容
			else {

				if (text.contains("验证码输入错误")) {
					json.setMsg("图片验证码错误");
				} else if (text.contains("您今日注册会员数已经达到上限")) {
					json.setMsg("注册上限");
				} else if (text.contains("该账号已被注册")) {
					json.setMsg("该账号已被注册");
				} else if (text.contains("504")) {
					json.setMsg("连接超时");
				} else {
					json.setMsg(text);
				}
				json.setSuccess(false);
			}

		} catch (Exception e) {

			json.setSuccess(false);
			if (e.getMessage().contains("504")) {
				json.setMsg("连接超时");
			} else {
				json.setMsg(e.getMessage());
			}
			// e.printStackTrace();
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			if (out != null) {
				out.close();
			}
		}
		return json;
	}

	/**
	 * 手机号码验证
	 */
	public static Json mobileCheck(String url, String param, String cookies) {

		Json json = new Json();

		PrintWriter out = null;

		try {
			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			if ("" != cookies) {

				// 设置cookie
				conn.setRequestProperty("Cookie", cookies);
			}

			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);

			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();

			// 定义BufferedReader输入流来读取URL的响应
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			String text = "";
			while ((line = in.readLine()) != null) {
				text += line;
			}

			in.close();

			// 得到cookies
			List<String> result = getCookies(conn.getHeaderFields());

			if (result.size() != 0) {

				json.setSuccess(true);
				json.setObject(result);
			}
			// 解析html内容
			else {

				if (text.contains("验证码输入不正确")) {
					json.setMsg("手机验证码错误");
				} else {
					json.setMsg(text);
				}
				json.setSuccess(false);
			}

		} catch (Exception e) {

			json.setSuccess(false);
			json.setMsg(e.getMessage());
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			if (out != null) {
				out.close();
			}
		}
		return json;
	}

	/**
	 * 图片下载
	 */
	public static Json downloadPic(String url, String savePath) {

		Json json = new Json();

		InputStream is = null;

		OutputStream os = null;

		try {

			String urlNameString = url;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			// connection.setRequestProperty("accept", "*/*");
			// connection.setRequestProperty("connection", "Keep-Alive");
			// connection.setRequestProperty("user-agent",
			// "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			// 设置请求超时为5s
			connection.setConnectTimeout(5 * 1000);

			// 建立实际的连接
			// connection.connect();

			// 图片下载
			is = connection.getInputStream();

			// 1K的数据缓冲
			byte[] bs = new byte[1024 * 10];

			// 读取到的数据长度
			int len;

			// 输出的文件流
			File sf = new File(savePath);

			if (!sf.exists()) {
				sf.mkdirs();
			}

			int startindex = url.lastIndexOf(".");

			// 扩展名
			String ext = url.substring(startindex, url.length());

			// 图片名
			String imgName = System.currentTimeMillis() + ext;

			os = new FileOutputStream(sf.getPath() + "\\" + imgName);

			// 开始读取
			while ((len = is.read(bs)) != -1) {
				os.write(bs, 0, len);
			}

			json.setSuccess(true);
			json.setMsg("返回成功");
			json.setObject(imgName);

		} catch (Exception e) {
			json.setSuccess(false);
			json.setMsg(e.getMessage());
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (is != null) {
					is.close();
				}
				if (os != null) {
					os.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return json;
	}

	/**
	 * 解析xml结果
	 * 
	 * @param xml
	 *            xml返回结果字符串
	 */
	public static String displayXmlResult(String xml) {
		if (xml.length() <= 0) {
			return "错误！";
		}
		Document dm;
		try {

			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

			DocumentBuilder db = dbf.newDocumentBuilder();
			dm = db.parse(new ByteArrayInputStream(xml.getBytes("utf-8")));
			NodeList resultNl = dm.getElementsByTagName("Result");

			if (resultNl.getLength() > 0) {
				return String.format(resultNl.item(0).getFirstChild().getNodeValue());
			} else {
				return "未知问题\r\n";
			}

		} catch (Exception e) {
			return "XML解析错误\r\n";

		}

	}

	/**
	 * 文件流转字节
	 * 
	 * @param inStream
	 * @return
	 * @throws IOException
	 */
	public static final byte[] inputbyte(InputStream inStream) throws IOException {
		ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
		byte[] buff = new byte[100];
		int rc = 0;
		while ((rc = inStream.read(buff, 0, 100)) > 0) {
			swapStream.write(buff, 0, rc);
		}
		byte[] in2b = swapStream.toByteArray();
		return in2b;
	}

	/**
	 * 得到cookies
	 * 
	 * @param map
	 * @return
	 */
	public static List<String> getCookies(Map<String, List<String>> map) {

		List<String> result = map.get("Set-Cookie");

		List<String> retcookie = new ArrayList<String>();

		if (result != null) {

			for (String item : result) {
				retcookie.add(item.substring(0, item.indexOf(";")));
			}
		}
		return retcookie;
	}

}
