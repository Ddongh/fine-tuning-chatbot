import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { styled } from '@mui/material/styles';

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

    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bbs/codingTestTreeData/')
        .then((response) => {
            const data = response.data as TreeData[];
            //const data = response.data.slice(0, 10) as TreeData[];
            setTreeData(data)
        })
        .catch(err => {
            console.log(err);
        })

    }, [])
    

    

    return (
        <div style={{display: 'flex'}}>
            <div className="left">
            <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
                <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                >
                {treeData && (
                    <>
                        {/* JavaScript 트리 */}
                        {treeData.some(node => node.language === 'javascript') && (
                            <TreeItem nodeId="javascript" label="Javascript">
                            {[0, 1, 2, 3, 4, 5].map(level => (
                            <TreeItem key={`level${level}`} nodeId={`level${level}`} label={`Lv.${level}`}>
                                {treeData
                                .filter(node => node.language === 'javascript' && node.level === level)
                                .map(node => (
                                    <TreeItem key={node.id} nodeId={node.id} label={node.title}></TreeItem>
                                ))}
                            </TreeItem>
                            ))}
                        </TreeItem>
                        )}

                        {/* Python 트리 */}
                        {treeData.some(node => node.language === 'python3') && (
                            <TreeItem nodeId="python3" label="Python3">
                            {[0, 1, 2, 3, 4, 5].map(level => (
                            <TreeItem key={`level${level}`} nodeId={`level${level}`} label={`Lv.${level}`}>
                                {treeData
                                .filter(node => node.language === 'javascript' && node.level === level)
                                .map(node => (
                                    <TreeItem key={node.id} nodeId={node.id} label={node.title}></TreeItem>
                                ))}
                            </TreeItem>
                            ))}
                        </TreeItem>
                        )}
                    </>
                )}
                </TreeView>
            </Box>
                
            </div>
            <div className="right">
                <h1>right</h1>
            </div>
        </div>
        
    )
}

export default Problems