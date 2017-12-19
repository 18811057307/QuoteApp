package com.sadetec.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sadetec.model.Shortcut;
import com.sadetec.repository.SysRoleRepository;
import com.sadetec.repository.SysUserRepository;
import com.sadetec.util.UserContext;

@Controller
public class IndexController {
	
	@Autowired
	private SysUserRepository sysUserRepository;
	
	@Autowired
	private SysRoleRepository sysRoleRepository;
	
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
			//modules.add("tms.module.ProductCategoryModule");
			modules.add("tms.module.ManualProductMapModule");
			modules.add("tms.module.CategoryModule");
			modules.add("tms.module.ResPartnerModule");


			shortcuts.add(new Shortcut("报价历史", "quotelog-shortcut", "quotationLog-win"));
			shortcuts.add(new Shortcut("产品对照管理", "manualmap-shortcut", "manualProductMap-win"));
			shortcuts.add(new Shortcut("产品系列管理", "category-shortcut", "category-win"));
			shortcuts.add(new Shortcut("供应商管理", "resPartner-shortcut", "resPartner-win"));

			shortcuts.add(new Shortcut("用户管理", "users-shortcut", "sysUser-win"));
			shortcuts.add(new Shortcut("角色管理", "role-shortcut", "sysRole-win"));
		}
		
		if(UserContext.hasRole("STOCK_ADMIN")) {
			modules.add("tms.module.StockQuantModule");
			shortcuts.add(new Shortcut("库存管理", "stockQuant-shortcut", "stockQuant-win"));			
		}
		
		if(UserContext.hasRole("PROCESS_ADMIN")) {
			modules.add("tms.module.ProcessAdminModule");
			shortcuts.add(new Shortcut("流程管理", "process-admin-shortcut", "process-admin-win"));			
		}
		
        model.addAttribute("deskTopModules", modules);
        model.addAttribute("deskTopShortcuts", shortcuts);
        model.addAttribute("isAdmin",UserContext.hasRole("ADMIN"));
        model.addAttribute("curUser",sysUserRepository.getByLoginName(UserContext.getUsername()));
        model.addAttribute("curUserRoles", UserContext.getRoles());
        return "index";
    }
}
