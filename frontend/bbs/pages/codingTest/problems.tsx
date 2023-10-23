import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';


export const BACKEND_URL: string = "http://127.0.0.1:8000/";

interface TreeData {
    id: string;
    level: number;
    partTitle: string;
    title: string;
    language: string;
}

interface SelectedData {
    id: string;
    level: number;
    partTitle: string;
    title: string;
    language: string;
    finishedAt: Date;
    explain: String;
    code: String;
    result: String;
    comment: String;

}

const Problems:React.FC = () => {

    const [treeData, setTreeData] = useState<TreeData[] | null>(null);
    const [selectedId, setSelectedId] = useState<String>("");
    const [selectedData, setSelectedData] = useState<SelectedData | null>(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };
    

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

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/bbs/selectedProblem/', {
            params: {id: selectedId}
        })
        .then((response) => {
            const data = response.data as SelectedData
            debugger;
            setSelectedData(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [selectedId])
    
    
    const onNodeClick = (nodeId: string) => {
        setSelectedId(nodeId);
        
    };
    

    return (
        <div style={{display: 'flex'}}>
            <div className="left">
            <Box sx={{ minHeight: 180, flexGrow: 1, minWidth: 300 }}>
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
                                    <TreeItem key={node.id} nodeId={node.id} label={node.title} onClick={() => onNodeClick(node.id)}></TreeItem>
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
                                .filter(node => node.language === 'python3' && node.level === level)
                                .map(node => (
                                    <TreeItem key={node.id} nodeId={node.id} label={node.title} onClick={() => onNodeClick(node.id)}></TreeItem>
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
            <div className="right" style={{width:"100%"}}>
                {selectedData && 
                    <div style={{display: 'flex'}}>
                        <div style={{width:"100%"}} >
                            <p>{selectedData.language+" > Lv." + selectedData.level + " > " + selectedData.title} </p>
                            <div dangerouslySetInnerHTML={{ __html: selectedData.code }} className="codeArea" />
                            <div dangerouslySetInnerHTML={{ __html: selectedData.result }} />
                            <Button onClick={handleToggle}>
                                {expanded ? '접기' : '펼치기'}
                            </Button>
                            <Collapse in={expanded}>
                                <div dangerouslySetInnerHTML={{ __html: selectedData.explain }} />
                            </Collapse>

                            
                        </div>
                                         
                    </div>
                    
                }
            </div>
        </div>
        
    )
}

export default Problems