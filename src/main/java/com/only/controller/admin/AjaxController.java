package com.only.controller.admin;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.only.model.common.Json;
import com.only.model.common.Setting;
import com.only.util.SettingUtil;

/**
 * ajax
 * 
 * @author lvlinguang
 * 
 */
@RequestMapping("ajax")
public class AjaxController {

	/**
	 * 图片主传
	 * 
	 * @param pic
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@RequestMapping("upload")
	public @ResponseBody
	Json Upload(HttpServletRequest request, MultipartFile upload_file) throws IllegalStateException, IOException {

		// 配置文件
		Setting setting = SettingUtil.get();

		// 文件名
		String picFile_name = upload_file.getOriginalFilename();

		// 扩展名
		String ext = picFile_name.substring(picFile_name.lastIndexOf("."));

		// 新文件名
		String file_name = System.currentTimeMillis() + ext;

		// 上传图片
		File uploadPic = new File("D:" + setting.getImageUploadPath());

		// 创建文件夹
		if (!uploadPic.exists()) {
			uploadPic.mkdirs();
		}

		File savedFile = new File(uploadPic, file_name);

		// 向磁盘写文件
		upload_file.transferTo(savedFile);

		Json json = new Json();
		json.setSuccess(true);
		json.setMsg("上传成功");
		json.setObject(setting.getImageUploadPath() + file_name);

		return json;
	}

}
