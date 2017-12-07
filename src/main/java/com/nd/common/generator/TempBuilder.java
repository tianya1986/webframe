package com.nd.common.generator;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.nd.common.util.ObjectUtils;

import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.Template;

/**
 * 项目名字:轻应用 <br/>
 * 类名称:TempBuilder <br/>
 * 类描述:根据模板构建简单重复代码 <br/>
 * 创建人:wengmd <br/>
 * 创建时间:2014-09-12 16:12:37 <br/>
 * 修改人: 涂清平 修改时间:2014-09-24 16:12:37 <br/>
 * 修改备注:代码自动生成到配置指定的包
 * 
 * @version
 */

public class TempBuilder {
    final String ENCODE = "UTF-8";
    private static Logger logger = Logger.getLogger(TempBuilder.class);
    // 当前类路径
    private String curPath = "";

    // 当前项目路径
    private String projectPath = "";

    public TempBuilder() {
        // TODO Auto-generated constructor stub
        try {
            curPath = TempBuilder.class.getResource("").toURI().getPath();
            logger.debug("curPath:" + curPath);
            File directory = new File("");// 参数为空
            projectPath = directory.getCanonicalPath();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unused")
    private String getCurPath() {
        return curPath;
    }

    private String getProjectPath() {
        return projectPath;
    }

    /**
     * 读取ftl，生成目标文件
     * 
     * @param parameters
     * @param ftlfile
     * @param outfile
     * @throws Exception
     */
    public void buildByFtl(Map<String, Object> parameters, File fttlPath, String ftlfile, String outfile) throws Exception {
        Configuration configuration = new Configuration();
        configuration.setObjectWrapper(new DefaultObjectWrapper());

        configuration.setDirectoryForTemplateLoading(fttlPath);
        Template template = configuration.getTemplate(ftlfile);
        if (ObjectUtils.isNotEmpty(template)) {
            OutputStreamWriter writer = null;
            try {
                writer = new OutputStreamWriter(new FileOutputStream(outfile), ENCODE);
                template.process(parameters, writer);

                writer.flush();
            } finally {
                if (writer != null)
                    writer.close();
            }
        }
    }

    /**
     * 读取存取取代值XML
     * 
     * @param path 文件路径
     * @param keyvalueFileName 取代XML文件名称
     * @return
     * @throws Exception
     */
    public Map<String, Object> loadIndex(String path, String keyvalueFileName) throws Exception {
        Document doc = null;
        Map<String, Object> rt = null;
        rt = new HashMap<String, Object>();
        /**
         * 设置系统默认
         */
        rt.put("_now", FastDateFormat.getInstance("yyyy-MM-dd HH:mm:s").format(new Date()));
        // 读取并解析XML文档
        // SAXReader就是一个管道，用一个流的方式，把xml文件读出来
        // 下面的是通过解析xml字符串的
        String vPath = StringUtils.isEmpty(path) ? curPath : path;
        String vSfindex = StringUtils.isEmpty(keyvalueFileName) ? "index.xml" : keyvalueFileName;
        String xmlIndex = vPath + vSfindex;
        logger.debug("xmlIndex:" + xmlIndex);
        SAXReader reader = new SAXReader(); // SAXReader主要用于解析XML文件

        doc = reader.read(xmlIndex); // 将字符串转为XML

        dom4jDoc2map(doc, rt);

        // 第二次读取index.xml内容到map中
        StringBuilder newIndexContext = load2loadIndex(rt, new File(vPath), vSfindex);
        doc = DocumentHelper.parseText(newIndexContext.toString());
        dom4jDoc2map(doc, rt);

        return rt;
    }

    @SuppressWarnings("unchecked")
    protected void dom4jDoc2map(Document doc, Map<String, Object> parameters) {
        Element rootElt = doc.getRootElement(); // 获取根节点
        // 对应要读取的key列表
        Element eleKeys = rootElt.element("keys");
        Iterator<Element> itEleKeys = eleKeys.elementIterator();
        while (itEleKeys.hasNext()) {

            Element eleKey = itEleKeys.next();
            VarKeyBean varKeyBean = new VarKeyBean();
            if (StringUtils.isNotEmpty(eleKey.elementText("id"))) {
                varKeyBean.setId(eleKey.elementText("id"));
                varKeyBean.setName(eleKey.elementText("name"));
                varKeyBean.setValue(eleKey.elementText("value"));
                parameters.put(varKeyBean.getId(), varKeyBean);
            } else {
                Element bean = eleKey.element("BeanList");
                Iterator<Element> beanEleLists = bean.elementIterator();
                List<VarKeyBean> beanLists = new ArrayList<VarKeyBean>();

                while (beanEleLists.hasNext()) {
                    Element eleBean = beanEleLists.next();
                    VarKeyBean beanKeyBean = new VarKeyBean();
                    beanKeyBean.setId(eleBean.elementText("id"));
                    beanKeyBean.setName(eleBean.elementText("name"));
                    beanKeyBean.setValue(eleBean.elementText("value"));
                    beanKeyBean.setAttribute(eleBean.attributeValue("targetPackage"));
                    if (null != eleBean.attributeValue("apiPackage"))
                        beanKeyBean.setUpload(eleBean.attributeValue("apiPackage"));
                    else
                        beanKeyBean.setUpload("");
                    logger.debug("id:" + beanKeyBean.getId());
                    logger.debug("name:" + beanKeyBean.getName());
                    logger.debug("value:" + beanKeyBean.getValue());
                    logger.debug("attribute:" + beanKeyBean.getAttribute());
                    logger.debug("upload:" + beanKeyBean.getUpload());
                    beanLists.add(beanKeyBean);

                }
                parameters.put("BeanList", beanLists);
            }

            logger.debug("id:" + varKeyBean.getId());
            logger.debug("name:" + varKeyBean.getName());
            logger.debug("value:" + varKeyBean.getValue());
        }
    }

    public StringBuilder load2loadIndex(Map<String, Object> parameters, File fttlPath, String ftlfile) throws Exception {
        Configuration configuration = new Configuration();
        configuration.setObjectWrapper(new DefaultObjectWrapper());

        configuration.setDirectoryForTemplateLoading(fttlPath);
        Template template = configuration.getTemplate(ftlfile);
        OutputStreamWriter writer = null;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            writer = new OutputStreamWriter(byteArrayOutputStream, ENCODE);
            template.process(parameters, writer);

            writer.flush();
        } finally {
            if (writer != null)
                writer.close();
        }
        // 新的index文件内容
        StringBuilder newindex = new StringBuilder(byteArrayOutputStream.toString(ENCODE));
        return newindex;
    }

    /**
     * 获取模板列表
     * 
     * @param path 获取模板路径
     * @return
     */
    public Collection<File> getPathFtls(String path) {
        String vPath = StringUtils.isEmpty(path) ? curPath : path;
        File flist = new File(vPath);
        if (flist.isFile()) {
            logger.warn(vPath + " is file");
            return null;
        }
        // 查找指定文件下的模板文件
        return FileUtils.listFiles(flist, new String[] { "ftl" }, true);
    }

    /**
     * 构建文件
     * 
     * @param path 获取模板路径
     * @param keyvalueFileName 存储取代XML文件名称
     * @param outPath 输出文件
     * @throws Exception
     */
    public void build(String path, String keyvalueFileName, String outPath) throws Exception {
        // 获取模板要取代值
        Map<String, Object> mapKeys = loadIndex(path, keyvalueFileName);
        // 模板地址
        File fftlpath = new File(StringUtils.isEmpty(path) ? curPath : path);

        Collection<File> fftls = getPathFtls(path);
        for (File file : fftls) {
            logger.debug("find ftl file:" + file);
            // 获取输出文件
            String fsname = file.getName();
            // String fsname = fsname.substring(0, fsname.lastIndexOf('.'));
            VarKeyBean varKeyBeanFtlFile = (VarKeyBean) mapKeys.get(fsname);
            String outFsname = varKeyBeanFtlFile.getValue();
            // 是否有指定路径
            int pathIdxSpe = outFsname.lastIndexOf('/');
            if (pathIdxSpe >= 0) {
                String extDir = outFsname.substring(0, pathIdxSpe);
                // 判断路径是否存在
                File newDir = new File(outPath + extDir);
                if (!newDir.exists()) {
                    newDir.mkdirs();
                }
            }
            String outFileName = outPath + outFsname;
            logger.debug("out file:" + outFileName);
            buildByFtl(mapKeys, fftlpath, fsname, outFileName);
        }
    }

    /**
     * 构建文件
     * 
     * @param path 获取模板路径
     * @param keyvalueFileName 存储取代XML文件名称
     * @param outPath 输出文件
     * @throws Exception
     */
    public void build(String path, String keyvalueFileName) throws Exception {
        // 获取模板要取代值
        Map<String, Object> mapKeys = loadIndex(path, keyvalueFileName);
        // 模板地址
        File fftlpath = new File(StringUtils.isEmpty(path) ? curPath : path);
        @SuppressWarnings("unchecked")
        List<VarKeyBean> beanList = (List<VarKeyBean>) mapKeys.get("BeanList");
        VarKeyBean javaTargetProject = (VarKeyBean) mapKeys.get("javaTargetProject");
        VarKeyBean jsTargetProject = (VarKeyBean) mapKeys.get("jsTargetProject");

        mapKeys.remove("BeanList");

        for (VarKeyBean varKey : beanList) {
            mapKeys.put(varKey.getId(), varKey);

            VarKeyBean packageBean = new VarKeyBean();
            packageBean.setId("package");
            packageBean.setName("package");
            packageBean.setValue(varKey.getAttribute());
            mapKeys.put("package", packageBean);

            StringBuffer javaOutPut = new StringBuffer(this.getProjectPath());

            javaOutPut.append("/").append(javaTargetProject.getValue());

            javaOutPut.append(varKey.getAttribute().replace(".", "/"));
            javaOutPut.append("/");

            StringBuffer jsOutPut = new StringBuffer(this.getProjectPath());

            jsOutPut.append("/").append(jsTargetProject.getValue()).append("/");

            Collection<File> fftls = getPathFtls(path);

            for (File file : fftls) {

                logger.debug("find ftl file:" + file);

                String outPutDir = "";

                // 获取输出文件
                String fsname = file.getName();
                VarKeyBean varKeyBeanFtlFile = (VarKeyBean) mapKeys.get(fsname);
                String outFsname = varKeyBeanFtlFile.getValue();
                outFsname = outFsname.replace("XXX", varKey.getValue());
                if (fsname.contains(".js.")) {
                    outPutDir = jsOutPut.toString();
                    // outFsname = outFsname.toLowerCase();
                } else if (fsname.contains(".java.")) {
                    outPutDir = javaOutPut.toString();
                }
                // String fsname = fsname.substring(0, fsname.lastIndexOf('.'));

                // 是否有指定路径
                int pathIdxSpe = outFsname.lastIndexOf('/');
                if (pathIdxSpe >= 0) {
                    String extDir = outFsname.substring(0, pathIdxSpe);
                    // 判断路径是否存在
                    File newDir = new File(outPutDir.toString() + extDir);
                    if (!newDir.exists()) {
                        newDir.mkdirs();
                    }
                }
                String outFileName = outPutDir.toString() + outFsname;
                logger.debug("out file:" + outFileName);
                buildByFtl(mapKeys, fftlpath, fsname, outFileName);
            }
            mapKeys.remove(varKey.getId());
            mapKeys.remove(packageBean);
        }
    }

    /**
     * 构建文件
     * 
     * @param path 获取模板路径
     * @param keyvalueFileName 存储取代XML文件名称
     * @param outPath 输出文件
     * @throws Exception
     */
    public void reBuild(String path, String keyvalueFileName, String modelName) throws Exception {
        // 获取模板要取代值
        Map<String, Object> mapKeys = loadIndex(path, keyvalueFileName);
        // 模板地址
        File fftlpath = new File(StringUtils.isEmpty(path) ? curPath + "/" + modelName : path);
        @SuppressWarnings("unchecked")
        List<VarKeyBean> beanList = (List<VarKeyBean>) mapKeys.get("BeanList");
        VarKeyBean javaTargetProject = (VarKeyBean) mapKeys.get("javaTargetProject");
        VarKeyBean jsTargetProject = (VarKeyBean) mapKeys.get("jsTargetProject");
        VarKeyBean pageDirectory = (VarKeyBean) mapKeys.get("pageDirectory");

        mapKeys.remove("BeanList");

        for (VarKeyBean varKey : beanList) {
            mapKeys.put(varKey.getId(), varKey);

            VarKeyBean packageBean = new VarKeyBean();
            packageBean.setId("package");
            packageBean.setName("package");
            packageBean.setValue(varKey.getAttribute());
            mapKeys.put("package", packageBean);

            VarKeyBean apiPackageBean = new VarKeyBean();
            apiPackageBean.setId("apiPackage");
            apiPackageBean.setName("apiPackage");
            apiPackageBean.setValue(varKey.getUpload());
            mapKeys.put("apiPackage", apiPackageBean);

            StringBuffer javaOutPut = new StringBuffer(this.getProjectPath());

            // if("api".equals(modelName))
            javaOutPut.append("/").append(javaTargetProject.getValue());
            if ("api".equals(modelName))
                javaOutPut.append(varKey.getUpload().replace(".", "/"));
            else
                javaOutPut.append(varKey.getAttribute().replace(".", "/"));
            javaOutPut.append("/");

            StringBuffer jsOutPut = new StringBuffer(this.getProjectPath());

            jsOutPut.append("/").append(jsTargetProject.getValue()).append("/");

            Collection<File> fftls = getPathFtls(curPath + "/" + modelName);
            logger.debug("ftlpath=" + curPath + "/" + modelName);
            logger.debug("fftls.count="+fftls.size());
            for (File file : fftls) {
                logger.debug("find ftl file:" + file);

                String outPutDir = "";

                // 获取输出文件
                String fsname = file.getName();
                VarKeyBean varKeyBeanFtlFile = (VarKeyBean) mapKeys.get(fsname);
                String outFsname = varKeyBeanFtlFile.getValue();
                outFsname = outFsname.replace("XXX", varKey.getValue());
                outFsname = outFsname.replace("YYY", pageDirectory.getValue());
                if (fsname.contains(".js.")) {
                    outPutDir = jsOutPut.toString();
                    // outFsname = outFsname.toLowerCase();
                } else if (fsname.contains(".java.")) {
                    outPutDir = javaOutPut.toString();
                }
                // String fsname = fsname.substring(0, fsname.lastIndexOf('.'));

                // 是否有指定路径
                int pathIdxSpe = outFsname.lastIndexOf('/');
                if (pathIdxSpe >= 0) {
                    String extDir = outFsname.substring(0, pathIdxSpe);
                    // 判断路径是否存在
                    File newDir = new File(outPutDir.toString() + extDir);
                    if (!newDir.exists()) {
                        newDir.mkdirs();
                    }
                }
                String outFileName = outPutDir.toString() + outFsname;
                logger.debug("out file:" + outFileName);
                buildByFtl(mapKeys, fftlpath, fsname, outFileName);
            }
            mapKeys.remove(varKey.getId());
            mapKeys.remove(packageBean);
        }
    }

    /**
     * 代码生成静态方法
     */
    public static void generate(String modelName) {
        try {
            TempBuilder tempBuilder = new TempBuilder();
            tempBuilder.reBuild(null, null, modelName);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {
        // TempBuilder.generate();

        TempBuilder tempBuilder = new TempBuilder();
        logger.setLevel(Level.DEBUG);
        try {
            tempBuilder.build(null, null);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}
