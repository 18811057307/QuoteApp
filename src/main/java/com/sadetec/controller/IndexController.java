package com.sadetec.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sadetec.model.Shortcut;
import com.sadetec.util.UserContext;

@Controller
public class IndexController {
	
	@RequestMapping({"/","/index"})
    public String indexPage(Model model) {
		
		List<String> modules = new ArrayList<String>();
		modules.add("tms.module.TempProductMapModule");
		modules.add("tms.module.BPMModule");
		
		List<Shortcut> shortcuts = new  ArrayList<Shortcut>();
		shortcuts.add(new Shortcut("业务流程", "bpm-shortcut", "bpm-win"));
		shortcuts.add(new Shortcut("报价处理", "quotemap-shortcut", "tempProductMap-win"));
		
		

		if(UserContext.hasRole("ADMIN")) {
			modules.add("tms.module.QuotationLogModule");
			modules.add("tms.module.SysUserModule");
			modules.add("tms.module.SysRoleModule");
			modules.add("tms.module.ProductCategoryModule");
			modules.add("tms.module.ManualProductMapModule");
			modules.add("tms.module.CategoryModule");
			

			shortcuts.add(new Shortcut("报价历史", "quotelog-shortcut", "quotationLog-win"));
			shortcuts.add(new Shortcut("产品对照管理", "manualmap-shortcut", "manualProductMap-win"));
			shortcuts.add(new Shortcut("产品系列管理", "category-shortcut", "category-win"));
			shortcuts.add(new Shortcut("用户管理", "users-shortcut", "sysUser-win"));
			shortcuts.add(new Shortcut("角色管理", "role-shortcut", "sysRole-win"));
		}
		
        model.addAttribute("deskTopModules", modules);
        model.addAttribute("deskTopShortcuts", shortcuts);
        model.addAttribute("isAdmin",UserContext.hasRole("ADMIN"));
        return "index";
    }
}
