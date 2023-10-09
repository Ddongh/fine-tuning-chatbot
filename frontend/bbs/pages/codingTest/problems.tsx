import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TreeView from 'react-treeview';

export const BACKEND_URL: string = "http://127.0.0.1:8000/";

interface TreeData {
    id: string;
    level: number;
    partTitle: string;
    title: string;
    language: string;
  }

const Problems:React.FC = () => {

    const [treeData, setTreeData] = useState<TreeData[] | null>(null);

    const renderTreeNode = (node: TreeData): JSX.Element => (
        <TreeView nodeLabel={node.language + ' - Level ' + node.level} key={node.id}>
          <div>{node.title}</div>
          {/* 자식 노드가 있는 경우에만 재귀적으로 호출 */}
          {treeData &&
            treeData
              .filter(childNode => childNode.level === node.level + 1)
              .map(childNode => renderTreeNode(childNode))}
        </TreeView>
      );

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bbs/codingTestTreeData/')
        .then((response) => {
            debugger;
            const data = response.data.slice(0, 10) as TreeData[];
            setTreeData(data)
        })
        .catch(err => {
            console.log(err);
        })

    }, [])
    

    

    return (
        <div>
            <div className="left">
                {/* {treeData && treeData[0].id} */}
                {treeData && treeData.map(node => renderTreeNode(node))}
            </div>
            <div className="right">

            </div>
        </div>
        
    )
}

export default Problems