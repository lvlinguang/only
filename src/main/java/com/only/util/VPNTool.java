package com.only.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import com.only.model.common.Json;

/**
 * 调用时只需要VPNTool.connectVPN(“VPN”, “username”, “password”)
 * 就可以连接VPN，调用VPNTool.disconnect(“VPN”)则断开连接。
 * 
 * vpn工具
 * 
 * @author lvlinguang
 * 
 */
public class VPNTool {

	/**
	 * 执行cmd命令
	 * 
	 * @param cmd
	 * @return
	 * @throws IOException
	 */
	private synchronized static String executeCmd(String cmd) throws IOException {
		Process process = Runtime.getRuntime().exec("cmd /c " + cmd);
		StringBuilder sbCmd = new StringBuilder();
		BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), "gbk"));
		String line = "";
		while ((line = br.readLine()) != null) {
			sbCmd.append(line);
		}
		return sbCmd.toString();
	}

	/**
	 * vpn断开
	 * 
	 * @param vpnName
	 * @return
	 * @throws IOException
	 */
	public synchronized static Json disconnectVPN(String vpnName) throws IOException {

		Json json = new Json();
		String cmd = "rasdial " + vpnName + " /disconnect";
		String result = executeCmd(cmd);
		if (result == null || result.contains("没有连接")) {
			json.setSuccess(false);
			json.setMsg(result);
		} else {
			json.setSuccess(true);
			json.setMsg(result);
		}
		return json;
	}

	/**
	 * vpn连接
	 * 
	 * @param vpnName
	 * @param username
	 * @param password
	 * @return
	 * @throws IOException
	 */
	public synchronized static Json connectVPN(String vpnName, String username, String password) throws IOException {

		Json json = new Json();

		String cmd = "rasdial " + vpnName + " " + username + " " + password;
		String result = executeCmd(cmd);
		// System.out.println(result);
		if (result == null || !result.contains("已连接")) {
			json.setSuccess(false);
			json.setMsg(result);
		} else {
			json.setSuccess(true);
			json.setMsg(result);
		}
		return json;
	}

}
