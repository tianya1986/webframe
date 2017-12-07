/**
 * 
 */
package com.nd.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 过滤器，用于检查登录
 * @author Caiyx on 2012-5-30
 * 
 */
public class CheckLoginFilter implements Filter {
    private static final Log logger = LogFactory.getLog(CheckLoginFilter.class.getName());

    protected FilterConfig filterConfig = null;

    private String redirectURL = null;

    private List notCheckURLList = new ArrayList();

    private String basePathstr = null;

    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {
        notCheckURLList.clear();
    }

    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse,
     * javax.servlet.FilterChain)
     */
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpSession session = request.getSession();
        Object obj = session.getAttribute("stuUser");
        if (obj == null) {// 未验证过
            if (basePathstr == null) {
                String path = request.getContextPath();
                int port = request.getServerPort();
                String basePath = request.getScheme() + "://" + request.getServerName();
                if (port == 80) {
                    basePath = basePath + path + "/";
                }
                else {
                    basePath = basePath + ":" + request.getServerPort() + path + "/";
                }
                basePathstr = basePath;
            }
            if ((!checkRequestURIIntNotFilterList(request))) {
                response.sendRedirect(request.getContextPath() + redirectURL);
                return;
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    /*
     * (non-Javadoc)
     * 
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
        redirectURL = filterConfig.getInitParameter("redirectURL");
        String notCheckURLListStr = filterConfig.getInitParameter("notCheckURLList");

        if (notCheckURLListStr != null) {
            StringTokenizer st = new StringTokenizer(notCheckURLListStr, ";");
            notCheckURLList.clear();
            while (st.hasMoreTokens()) {
                notCheckURLList.add(st.nextToken());
            }
        }
    }

    private boolean checkRequestURIIntNotFilterList(HttpServletRequest request) {
        String uri = request.getServletPath() + (request.getPathInfo() == null ? "" : request.getPathInfo());
        int indexDot = uri.lastIndexOf('.');
        String suffix = null;
        if (indexDot > 0) {
            suffix = uri.substring(indexDot, uri.length());
        }
        return notCheckURLList.contains(uri) || (suffix != null && notCheckURLList.contains("*" + suffix));
    }
}
