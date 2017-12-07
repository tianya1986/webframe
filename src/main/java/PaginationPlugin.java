
import java.net.URISyntaxException;
import java.util.List;  
  
import org.mybatis.generator.api.CommentGenerator;  
import org.mybatis.generator.api.IntrospectedTable;  
import org.mybatis.generator.api.PluginAdapter;  
import org.mybatis.generator.api.ShellRunner;  
import org.mybatis.generator.api.dom.java.Field;  
import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;  
import org.mybatis.generator.api.dom.java.JavaVisibility;  
import org.mybatis.generator.api.dom.java.Method;  
import org.mybatis.generator.api.dom.java.Parameter;  
import org.mybatis.generator.api.dom.java.TopLevelClass;  
import org.mybatis.generator.api.dom.xml.Attribute;  
import org.mybatis.generator.api.dom.xml.Document;  
import org.mybatis.generator.api.dom.xml.TextElement;  
import org.mybatis.generator.api.dom.xml.XmlElement;  
 
/**
 * 
 * 类描述：   
 * 创建人：吴杰明 
 * 创建时间：2014-5-11 下午05:59:28   
 * @version
 */
public class PaginationPlugin extends PluginAdapter {  
	/**
	 * ExampleClass的属性方法添 加  
	 */
    @Override  
  
    public boolean modelExampleClassGenerated(TopLevelClass topLevelClass,  
            IntrospectedTable introspectedTable) {  
        // add field, getter, setter for limit clause  
        addPage(topLevelClass, introspectedTable, "page");  
//        addDialect(topLevelClass, introspectedTable, "dialect");  
        return super.modelExampleClassGenerated(topLevelClass,  
                introspectedTable);  
    }  
	  /**
	   * xml配置生成
	   */
    @Override  
    public boolean sqlMapDocumentGenerated(Document document,  
            IntrospectedTable introspectedTable) {  
        XmlElement parentElement = document.getRootElement();  
  
        // 产生分页语句前半部分  
//        XmlElement paginationPrefixElement = new XmlElement("sql");  
//        paginationPrefixElement.addAttribute(new Attribute("id",  
//                "OracleDialectPrefix"));  
//        XmlElement pageStart = new XmlElement("if");  
//        pageStart.addAttribute(new Attribute("test", "page != null"));  
//        XmlElement pageDialect1 = new XmlElement("if");  
//        pageDialect1.addAttribute(new Attribute("test", "dialect == 'oralce'"));  
//        pageStart.addElement(pageDialect1);  
//        pageDialect1.addElement(new TextElement(  
//                "select * from ( select row_.*, rownum rownum_ from ( "));  
//        paginationPrefixElement.addElement(pageStart);  
//        parentElement.addElement(paginationPrefixElement);  
//  
//        // 产生分页语句后半部分  
        XmlElement paginationSuffixElement = new XmlElement("sql");  
        paginationSuffixElement.addAttribute(new Attribute("id",  
                "MysqlSuffix"));  
        XmlElement pageEnd = new XmlElement("if");  
        pageEnd.addAttribute(new Attribute("test", "page != null"));  
//        XmlElement pageDialect2 = new XmlElement("if");  
//        pageDialect2.addAttribute(new Attribute("test", "dialect == 'oralce'"));  
//        pageEnd.addElement(pageDialect2);  
//        pageDialect2.addElement(new TextElement(  
//                "<![CDATA[ ) row_ ) where rownum_ > #{page.begin} and rownum_ <= #{page.end} ]]>"));  
          
        //----- mysql语句。  
//        XmlElement mysqlDialect = new XmlElement("if");  
//        mysqlDialect.addAttribute(new Attribute("test", "dialect == 'mysql'"));  
//        pageEnd.addElement(mysqlDialect);  
        pageEnd.addElement(new TextElement(  
                "limit #{page.start} , #{page.rows}"));  
        paginationSuffixElement.addElement(pageEnd);  
          
        parentElement.addElement(paginationSuffixElement);  
  
        return super.sqlMapDocumentGenerated(document, introspectedTable);  
    }  
  
    @Override  
    public boolean sqlMapSelectByExampleWithoutBLOBsElementGenerated(  
            XmlElement element, IntrospectedTable introspectedTable) {  
  
//        XmlElement pageStart = new XmlElement("include"); //$NON-NLS-1$     
//        pageStart.addAttribute(new Attribute("refid", "OracleDialectPrefix"));  
//        element.getElements().add(0, pageStart);  
  
        XmlElement isNotNullElement = new XmlElement("include"); //$NON-NLS-1$     
        isNotNullElement.addAttribute(new Attribute("refid",  
                "MysqlSuffix"));  
        element.getElements().add(isNotNullElement);  
  
        return super.sqlMapUpdateByExampleWithoutBLOBsElementGenerated(element,  
                introspectedTable);  
    }  
  
    /** 
     * 添加方言属性及代码
     * @param topLevelClass 
     * @param introspectedTable 
     * @param name 
     */  
    @SuppressWarnings("unused")
	private void addDialect(TopLevelClass topLevelClass,  
            IntrospectedTable introspectedTable, String name) {  
        CommentGenerator commentGenerator = context.getCommentGenerator();  
        Field field = new Field();  
        field.setVisibility(JavaVisibility.PRIVATE);  
        field.setType(new FullyQualifiedJavaType("String"));  
        field.setName(name + " = \"mysql\"");  
        commentGenerator.addFieldComment(field, introspectedTable);  
        topLevelClass.addField(field);  
        char c = name.charAt(0);  
        String camel = Character.toUpperCase(c) + name.substring(1);  
        Method method = new Method();  
        method.setVisibility(JavaVisibility.PUBLIC);  
        method.setName("set" + camel);  
        method.addParameter(new Parameter(new FullyQualifiedJavaType(  
                "String"), name));  
        method.addBodyLine("this." + name + "=" + name + ";");  
        commentGenerator.addGeneralMethodComment(method, introspectedTable);  
        topLevelClass.addMethod(method);  
        method = new Method();  
        method.setVisibility(JavaVisibility.PUBLIC);  
        method.setReturnType(new FullyQualifiedJavaType(  
                "String"));  
        method.setName("get" + camel);  
        method.addBodyLine("return " + name + ";");  
        commentGenerator.addGeneralMethodComment(method, introspectedTable);  
        topLevelClass.addMethod(method);  
    }  
      
    /** 
     * 添加分页属性及方法
     * @param topLevelClass 
     * @param introspectedTable 
     * @param name 
     */  
    private void addPage(TopLevelClass topLevelClass,  
            IntrospectedTable introspectedTable, String name) {  
        topLevelClass.addImportedType(new FullyQualifiedJavaType(  
                "com.nd.common.util.Page"));  
        CommentGenerator commentGenerator = context.getCommentGenerator();  
        Field field = new Field();  
        field.setVisibility(JavaVisibility.PROTECTED);  
        field.setType(new FullyQualifiedJavaType("com.nd.common.util.Page"));  
        field.setName(name);  
        commentGenerator.addFieldComment(field, introspectedTable);  
        topLevelClass.addField(field);  
        char c = name.charAt(0);  
        String camel = Character.toUpperCase(c) + name.substring(1);  
        Method method = new Method();  
        method.setVisibility(JavaVisibility.PUBLIC);  
        method.setName("set" + camel);  
        method.addParameter(new Parameter(new FullyQualifiedJavaType(  
                "com.nd.common.util.Page"), name));  
        method.addBodyLine("this." + name + "=" + name + ";");  
        commentGenerator.addGeneralMethodComment(method, introspectedTable);  
        topLevelClass.addMethod(method);  
        method = new Method();  
        method.setVisibility(JavaVisibility.PUBLIC);  
        method.setReturnType(new FullyQualifiedJavaType(  
                "com.nd.common.util.Page"));  
        method.setName("get" + camel);  
        method.addBodyLine("return " + name + ";");  
        commentGenerator.addGeneralMethodComment(method, introspectedTable);  
        topLevelClass.addMethod(method);  
    }  
  
    /** 
     * This plugin is always valid - no properties are required 
     */  
    public boolean validate(List<String> warnings) {  
        return true;  
    }  
      
    public static void generate() {  
        String config ="";
		try {
			config = PaginationPlugin.class.getResource(  
			        "generator.xml").toURI().getPath();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}  
        String[] arg = { "-configfile", config, "-overwrite" };  
        ShellRunner.main(arg);  
    }  
    public static void main(String[] args) {  
        generate();  
    }  
}  