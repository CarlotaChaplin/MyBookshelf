package com.senac.mybookshelf.controller;

import com.senac.mybookshelf.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
    
    private User getUserSession(HttpServletRequest request) {
        HttpSession sessao = request.getSession(); 
        if (sessao == null) {
            return null;
        }

        var user = (User) sessao.getAttribute("user");
        return user;
    }
    
    @RequestMapping("/")
    public ModelAndView index(HttpServletRequest request) {
        var user = this.getUserSession(request);
        if (user == null) {
            return new ModelAndView("redirect:/login");
        }
        
        return new ModelAndView("redirect:/book");
    }
    
    @RequestMapping("/login")
    public String login() {
        return "login";
    }
    
    @RequestMapping("/sign-in")
    public String signIn() {
        return "sign-in";
    }
    
    @PostMapping("/logout")
    public ModelAndView logout(HttpServletRequest request) {
        HttpSession sessao = request.getSession(); 
        if(sessao != null){ 
            sessao.removeAttribute("user");
        }
        return new ModelAndView("redirect:/login");
    }
    
    @RequestMapping("/book")
    public ModelAndView listBook(HttpServletRequest request) {
        var user = this.getUserSession(request);
        if (user == null) {
            return new ModelAndView("redirect:/login");
        }
        
        return new ModelAndView("book/list");
    }
    
    @RequestMapping("/book/create")
    public ModelAndView createBook(HttpServletRequest request) {
        var user = this.getUserSession(request);
        if (user == null) {
            return new ModelAndView("redirect:/login");
        }
        return new ModelAndView("book/create");
    }
    
    @RequestMapping("/book/{id}/update")
    public ModelAndView updateBook(HttpServletRequest request, @PathVariable("id") Integer id, Model model) {
        var user = this.getUserSession(request);
        if (user == null) {
            return new ModelAndView("redirect:/login");
        }

        model.addAttribute("bookId", id);
        return new ModelAndView("book/update");
    }
}
