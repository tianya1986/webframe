package com.nd.common;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author lishude
 *
 */
public class EasyUITreeFactory {
	
	public static List<TreeNode> buildtree(List<TreeNode> nodes,int id){
		List<TreeNode> treeNodes=new ArrayList<TreeNode>();
		for (TreeNode treeNode : nodes) {
			TreeNode node=new TreeNode();
			node.setId(treeNode.getId());
			node.setText(treeNode.getText());
			node.setAttributes(treeNode.getAttributes());
			if(id==treeNode.getPid()){
				node.setChildren(buildtree(nodes, node.getId()));
				treeNodes.add(node);
			}
			
		}
		return treeNodes;
	}
	
	public static List<TreeNode> validTree(List<TreeNode> src){
		List<TreeNode> list = new ArrayList<TreeNode>();
		for(TreeNode tn : src){
			if(haveParentNode(tn,src)){
				list.add(tn);
			}else{
				tn.setPid(0);
				list.add(tn);
			}
				
		}
		return list;
		
	}
	private static boolean haveParentNode(TreeNode tn,List<TreeNode> src){
		for(TreeNode temp : src){
			if(tn.getPid() ==  temp.getId())
					return true;
		}
		return false;
	}

}
