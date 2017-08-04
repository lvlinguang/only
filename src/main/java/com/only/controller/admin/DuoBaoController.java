package com.only.controller.admin;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.core.io.ClassPathResource;

import com.only.model.common.Json;
import com.only.util.HttpPostUploadUtil;
import com.only.util.HttpRequest;
import com.only.util.VPNTool;

/**
 * 爱拍一元云购
 * 
 * @author lvlinguang
 * 
 */
public class DuoBaoController {

	// xml临时数据
	private static List<UserInfo> users;

	// 头像文件夹
	private static String Pic_path = "D:\\avatar\\";

	// vpn
	private static String vpn_name = "VPN";
	private static String vpn_account = "bw12";
	private static String vpn_pass = "12";

	// 短信api
	private static String dx_account = "api-ywi4kj07";
	private static String dx_pass = "qa960529";
	private static String dx_number = "10717";
	private static String dx_token_n = "";

	// 商品/活动id
	private static String id = "1368187";
	// 参与人次
	private static String num = "2";
	// 单次参与金额
	private static String money = "1";

	// 注册信息
	private static String phone = "";
	private static String password = "";
	private static String nickName = "";

	public static void main(String[] args) throws IOException, InterruptedException, DocumentException {

		System.out.println("夺宝服务启动");

		// 得到xml用户信息
		users = getUserList();

		// 下载头像
		// downloadAvatar();

		while (true) {

			// 重启vpn
			restVpn();

			// 短信api登录
			Json dx_token = mobileLogin();

			// 得到token
			dx_token_n = dx_token.getObject().toString();

			// 得到手机号码
			Json dx_phone = getPhone(dx_token_n);

			// 手机号码
			phone = dx_phone.getObject().toString();

			// 得到验证码信息
			Json data1 = getCode();

			// 用户注册
			Json data2 = userReg(data1);

			// 手机号验证
			Json data3 = mobileCheck(data1, data2, null);

			// 修改用用户
			updateUser(data3);

			// 修改头像
			updateAvatar(data3);

			// 加入购物车
			addCart(data3);
		}

	}

	/**
	 * 重启vpn
	 * 
	 * @throws IOException
	 */
	public static void restVpn() throws IOException {

		// 断开vpn
		VPNTool.disconnectVPN(vpn_name);

		// 连接vpn
		Json info = VPNTool.connectVPN(vpn_name, vpn_account, vpn_pass);

		if (!info.isSuccess()) {
			System.out.println("vpn连接失败，正在重新连接！" + info.getMsg());
			restVpn();
		} else {
			System.out.println("vpn连接成功！");
		}
	}

	/**
	 * 得到图片验证码及cookie
	 * 
	 * @return
	 */
	public static Json getCode() {

		// 得到验证码信息
		Json data1 = HttpRequest.getCode("http://www.aipaiyg.com/api/checkcode/image/100_35/?0.7006874204986335", "");

		if (!data1.isSuccess()) {
			System.out.println(data1.getMsg());
		}
		return data1;
	}

	/**
	 * 用户注册
	 * 
	 * @param data1
	 * @return
	 * @throws IOException
	 */
	public static Json userReg(Json data1) throws IOException {

		password = randomPass();

		System.out.println("手机号：" + phone);

		System.out.println("密码：" + password);

		// 图片cookie及验证码
		List<String> pic_cookies = (List<String>) data1.getObject();

		String param1 = "name=" + phone + "&userpassword=" + password + "&userpassword2=" + password + "&verify=" + pic_cookies.get(1) + "&submit=%E5%90%8C%E6%84%8F%E4%BB%A5%E4%B8%8B%E5%8D%8F%E8%AE%AE%EF%BC%8C%E6%8F%90%E4%BA%A4";

		Json data2 = HttpRequest.sendRegister("http://www.aipaiyg.com/register", param1, pic_cookies.get(0));

		// 错误
		if (!data2.isSuccess()) {

			System.out.println(data2.getMsg());

			if (data2.getMsg() == "该账号已被注册") {

				return data2;
			}

			if (data2.getMsg() == "注册上限" || data2.getMsg() == "连接超时") {

				System.out.println("正在重新连接！");

				// 重启vpn
				restVpn();
			}

			// 重获验证码
			data1 = getCode();

			data2 = userReg(data1);
		}

		return data2;
	}

	/**
	 * 手机号码验证（发送注册码）
	 * 
	 * @param data1
	 * @param data2
	 * @return
	 * @throws InterruptedException
	 */
	public static Json mobileCheck(Json data1, Json data2, Json data3) throws InterruptedException {

		String code = "";

		Json dx_code = getPhoneCode(dx_token_n, phone);

		if (!dx_code.isSuccess()) {
			System.out.println("获取手机验证码失败，重新注册！");
			code = "-1";
		} else {
			code = dx_code.getObject().toString();
		}

		// 重新注册手机号
		if ("-1".equals(code)) {
			// 用户注册
			try {

				// 重启vpn
				restVpn();

				// 得到手机号码
				Json dx_phone = getPhone(dx_token_n);

				// 手机号码
				phone = dx_phone.getObject().toString();

				// 重新注册
				data2 = userReg(data1);

				// 验证码
				data3 = mobileCheck(data1, data2, data3);

			} catch (IOException e) {

			}
		} else {

			// 图片cookie及验证码
			List<String> pic_cookies = (List<String>) data1.getObject();

			String reg_cookies = (String) data2.getObject();

			String cookies10 = pic_cookies.get(0) + ";" + reg_cookies + ";";

			String param = "checkcode=" + code + "&submit=%E6%8F%90%E4%BA%A4%E9%AA%8C%E8%AF%81";

			// 提交手机验证码
			data3 = HttpRequest.mobileCheck("http://www.aipaiyg.com/member/user/mobilecheck/", param, cookies10);

			// 错误
			if (!data3.isSuccess()) {

				System.out.println(data3.getMsg());

				data3 = mobileCheck(data1, data2, data3);
			}
		}

		List<String> user_cookies = (List<String>) data3.getObject();

		return data3;
	}

	/**
	 * 用户登录
	 * 
	 * @param pic
	 *            图片验证
	 * @param l_phone
	 *            手机号码
	 * @param l_password
	 *            密码
	 * @return
	 */
	public static Json getLogin(Json pic, String l_phone, String l_password) {

		// 图片cookie及验证码
		List<String> pic_cookies = (List<String>) pic.getObject();

		// 登录
		String param = "username=" + l_phone + "&password=" + l_password + "&autologin=on&verify=" + pic_cookies.get(1) + "&submit=%E7%99%BB++%E5%BD%95&hidurl=http%3A%2F%2Fwww.aipaiyg.com%2F";

		// 发送 POST
		Json sr = HttpRequest.sendLogion("http://www.aipaiyg.com/login/aHR0cDovL3d3dy5haXBhaXlnLmNvbS8=", param, pic_cookies.get(0));

		if (!sr.isSuccess()) {
			System.out.println(sr.getMsg());
		}
		return sr;
	}

	/**
	 * 修改昵称
	 * 
	 * @param data3
	 * @return
	 */
	public static Json updateUser(Json data3) {

		String cookies = "";

		List<String> dt = (List<String>) data3.getObject();

		for (String item : dt) {
			cookies = cookies + item + ";";
		}

		cookies = cookies.substring(0, cookies.length() - 1);

		nickName = randomNickname();

		String qianming = nickName;

		String p2 = "username=" + nickName + "&qianming=" + qianming + "&submit=保存";

		// 修改昵称
		String result = HttpRequest.sendPost("http://www.aipaiyg.com/member/home/usermodify", p2, cookies);

		if (result.contains("修改成功")) {
			// System.out.println("昵称修改成功");
		} else {
			System.out.println(result);
			updateUser(data3);
		}

		Json json = new Json();
		return json;
	}

	/**
	 * 修改头像
	 * 
	 * @param data3
	 * @throws UnsupportedEncodingException
	 */
	public static void updateAvatar(Json data3) throws UnsupportedEncodingException {

		String cookies = "";

		List<String> dt = (List<String>) data3.getObject();

		for (String item : dt) {
			cookies = cookies + item + ";";
		}

		cookies = cookies.substring(0, cookies.length() - 1);

		// 图片地址
		String filepath = Pic_path + randomAvatar();

		// 上传地址
		String urlStr = "http://www.aipaiyg.com/member/home/userphotoup";

		// 文本
		Map<String, String> textMap = new HashMap<String, String>();

		textMap.put("ushell", dt.get(0).replace("ushell=", ""));
		textMap.put("uid", dt.get(1).replace("uid=", ""));

		// 文件
		Map<String, String> fileMap = new HashMap<String, String>();
		fileMap.put("Filedata", filepath);

		// 提交
		String ret = HttpPostUploadUtil.formUpload(urlStr, textMap, fileMap, cookies);
		System.out.println(ret);

		String picString = URLEncoder.encode(ret.trim(), "utf-8");

		String param = "x=0&y=0&w=160&h=160&img=" + picString + "&submit=%E4%BF%9D%E5%AD%98%E5%A4%B4%E5%83%8F";

		// 头像修改
		String result = HttpRequest.sendPost("http://www.aipaiyg.com/member/home/userphotoinsert", param, cookies);

		if (result.contains("头像修改成功")) {
			System.out.println("头像修改成功");
		} else {
			System.out.println(result);
		}

	}

	/**
	 * 加入购物车并支付
	 * 
	 * @param data3
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static void addCart(Json data3) throws UnsupportedEncodingException {

		Scanner scanner = new Scanner(System.in);

		System.out.println("请输入要参与的活动ID");

		id = scanner.nextLine();

		String cookies = "";

		List<String> dt = (List<String>) data3.getObject();

		for (String item : dt) {
			cookies = cookies + item + ";";
		}

		// 设置购物车cookie
		String card = URLEncoder.encode("{\"" + id + "\":{\"shenyu\":" + 2 + ",\"num\":" + 2 + ",\"money\":" + money + "},\"MoenyCount\":\"2.00\"}", "UTF-8");

		cookies += "Cartlist=" + card;

		// 加入购物车
		Json result = HttpRequest.addCart("http://www.aipaiyg.com/member/cart/pay/" + new Date().getTime() + "/check", "", cookies);

		List<String> cart_cookies = (List<String>) result.getObject();

		cookies += ";" + cart_cookies.get(0);

		String param = "account=30&submitcode=" + cart_cookies.get(1) + "&submit=";

		// 提交
		String result10 = HttpRequest.sendPost("http://www.aipaiyg.com/member/cart/paysubmit", param, cookies);
		if (result10.contains("恭喜您，支付成功")) {

			System.out.println("夺宝成功，夺宝信息：昵称：" + nickName + "，手机号码：" + phone + "，密码：" + password + "，活动ID：" + id);
		} else {
			System.out.println(result10);
		}

	}

	/**
	 * 随机昵称
	 * 
	 * @return
	 */
	public static String randomNickname() {

		int size = users.size();

		int c1 = (int) (Math.random() * size);

		return users.get(c1).getName();
	}

	/**
	 * 得到磁盘上随机头像
	 * 
	 * @return
	 */
	public static String randomAvatar() {

		File dir = new File(Pic_path);

		File[] subs = dir.listFiles();

		int count = subs.length;

		int c1 = (int) (Math.random() * count);

		File f1 = subs[c1];

		return f1.getName();
	}

	/**
	 * 随机密码
	 * 
	 * @return
	 */
	public static String randomPass() {

		String chars = "abcdefghijklmnopqrstuvwxyz";

		String data = "";

		for (int i = 0; i < 8; i++) {

			char abc = chars.charAt((int) (Math.random() * 26));
			data += abc;
		}

		return data;
	}

	/**
	 * 得到用户列表（xml中读）
	 * 
	 * @return
	 * @throws IOException
	 * @throws DocumentException
	 */
	public static List<UserInfo> getUserList() throws IOException, DocumentException {

		// 得到xml文件
		File shopXmlFile = new ClassPathResource("/userlist.xml").getFile();

		SAXReader reader = new SAXReader();

		Document doc = reader.read(shopXmlFile);

		// 要标签
		Element root = doc.getRootElement();

		List<UserInfo> user = new ArrayList<UserInfo>();

		// 子标签
		List<Element> elements = root.elements();

		for (Element empEle : elements) {

			UserInfo userInfo = new UserInfo();

			userInfo.setName(empEle.elementText("name"));

			userInfo.setPic(empEle.elementText("pic"));

			user.add(userInfo);
		}

		return user;

	}

	/**
	 * 下载头像到本地磁盘
	 * 
	 * @return
	 */
	public static boolean downloadAvatar() {

		for (UserInfo u1 : users) {

			// 下载图片到本地
			Json json = HttpRequest.downloadPic(u1.getPic(), Pic_path);

			System.out.println(json.getObject());
		}
		System.out.println("头像下载完成");
		return true;
	}

	/**
	 * 得到短信api登录
	 * 
	 * @return
	 * @throws InterruptedException
	 */
	public static Json mobileLogin() throws InterruptedException {

		Json json = new Json();

		String param = "action=loginIn&name=" + dx_account + "&password=" + dx_pass;

		// 得到验证码信息
		String data1 = HttpRequest.sendGet("http://api.hellotrue.com/api/do.php", param, "");

		if (data1 == null || !data1.startsWith("1|")) {

			System.out.println("短信api登录失败，正在重新登录！" + data1);

			Thread.sleep(5000);
			json = mobileLogin();

		} else {
			String[] array = data1.split("\\|");

			if ("1".equals(array[0]) == false) {

				json.setSuccess(false);

				System.out.println(data1);
			} else {
				json.setSuccess(true);
			}
			json.setObject(array[1]);
		}
		return json;

	}

	/**
	 * 得到短信api手机号码
	 * 
	 * @param token
	 * @return
	 * @throws InterruptedException
	 */
	public static Json getPhone(String token) throws InterruptedException {

		Json json = new Json();

		String param = "action=getPhone&sid=" + dx_number + "&token=" + token + "&phoneType=CMCC&vno=0";

		// 得到验证码信息
		String data1 = HttpRequest.sendGet("http://api.hellotrue.com/api/do.php", param, "");

		if (data1 == null || !data1.startsWith("1|")) {

			System.out.println("短信api获取手机号，正在重新获取！" + data1);

			Thread.sleep(5000);
			System.out.print(data1);
			json = getPhone(token);

		} else {

			String[] array = data1.split("\\|");

			if ("1".equals(array[0]) == false) {

				json.setSuccess(false);

				System.out.println(data1);
			} else {
				json.setSuccess(true);
			}
			json.setObject(array[1]);
		}

		return json;
	}

	/**
	 * 得到短信api手机验证码
	 * 
	 * @param token
	 * @return
	 * @throws InterruptedException
	 */
	public static Json getPhoneCode(String token, String phone) throws InterruptedException {

		Json json = new Json();

		String param = "action=getMessage&sid=" + dx_number + "&phone=" + phone + "&token=" + token;

		for (int i = 0; i < 20; i++) {

			// 得到验证码信息
			String data1 = HttpRequest.sendGet("http://api.hellotrue.com/api/do.php", param, "");

			if (!data1.startsWith("1|")) {

				json.setSuccess(false);

				System.out.println(data1);
				if (data1.contains("短信已取回或手机号已释放")) {
					break;
				}

			} else {

				String[] array = data1.split("\\|");

				String info = array[1];

				String[] arrayString = info.split("[0-9]+");

				int startindex = info.indexOf(arrayString[1]);

				String code = info.substring(startindex - 6, startindex);

				json.setSuccess(true);

				json.setObject(code);

				break;
			}
			Thread.sleep(3000);
		}

		return json;
	}

}

/**
 * 用户类
 * 
 * @author lvlinguang
 * 
 */
class UserInfo {
	private String name;
	private String pic;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

}
