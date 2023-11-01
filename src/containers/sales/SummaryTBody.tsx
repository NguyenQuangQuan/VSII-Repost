// materia-ui
import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { IListParent, IListTable, ISalePipelineSummary } from 'types';
import { formatPrice } from 'utils/common';

interface ISummaryTBodyProps {
    summary: ISalePipelineSummary | undefined;
}
const SummaryTBody = (props: ISummaryTBodyProps) => {
    const { summary } = props;

    return (
        <>
            {summary && (
                <>
                    <TableBody
                        sx={{
                            '& .tableCell-row-name': {
                                fontWeight: '900'
                            },
                            '& .tableCell-row': {
                                textAlign: 'right'
                            },
                            '& .highlighted-row': {
                                '& .MuiTableCell-root:first-of-type': {
                                    paddingLeft: '40px'
                                }
                            },
                            '& .highlighted-row-childrens': {
                                '& .MuiTableCell-root:first-of-type': {
                                    paddingLeft: '80px'
                                }
                            }
                        }}
                    >
                        {summary.tableLarge.listParent.map((parent: IListParent, index: number) => (
                            <>
                                <TableRow key={index} sx={{ '& > td': { color: parent.color, backgroundColor: parent.backgroundColor } }}>
                                    <TableCell className={'tableCell-row-name'}>
                                        <FormattedMessage id={parent.name} />
                                    </TableCell>
                                    {parent.value && (
                                        <>
                                            <TableCell className={'tableCell-row'}>{formatPrice(parent.value.usd)}</TableCell>
                                            <TableCell className={'tableCell-row'}>{formatPrice(parent.value.vnd)}</TableCell>
                                            <TableCell className={'tableCell-row'}>{formatPrice(parent.value.quarter1)}</TableCell>
                                            <TableCell className={'tableCell-row'}>{formatPrice(parent.value.quarter2)}</TableCell>
                                            <TableCell className={'tableCell-row'}>{formatPrice(parent.value.quarter3)}</TableCell>
                                            <TableCell className={'tableCell-row'}>{formatPrice(parent.value.quarter4)}</TableCell>
                                            <TableCell className={'tableCell-row'}>
                                                {formatPrice(parent.value.totalRevenueEstimation)}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                                {parent?.childrens?.map((children: IListParent, index: number) => (
                                    <>
                                        <TableRow
                                            key={index}
                                            className={'highlighted-row'}
                                            sx={{ '& > td': { color: children.color, backgroundColor: children.backgroundColor } }}
                                        >
                                            <TableCell className={'tableCell-row-name'}>
                                                <FormattedMessage id={children.name} />
                                            </TableCell>
                                            {children.value && (
                                                <>
                                                    <TableCell className={'tableCell-row'}>{formatPrice(children.value.usd)}</TableCell>
                                                    <TableCell className={'tableCell-row'}>{formatPrice(children.value.vnd)}</TableCell>
                                                    <TableCell className={'tableCell-row'}>
                                                        {formatPrice(children.value.quarter1)}
                                                    </TableCell>
                                                    <TableCell className={'tableCell-row'}>
                                                        {formatPrice(children.value.quarter2)}
                                                    </TableCell>
                                                    <TableCell className={'tableCell-row'}>
                                                        {formatPrice(children.value.quarter3)}
                                                    </TableCell>
                                                    <TableCell className={'tableCell-row'}>
                                                        {formatPrice(children.value.quarter4)}
                                                    </TableCell>
                                                    <TableCell className={'tableCell-row'}>
                                                        {formatPrice(children.value.totalRevenueEstimation)}
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                        {children?.childrens?.map((child: IListParent, index: number) => (
                                            <>
                                                <TableRow
                                                    key={index}
                                                    className={'highlighted-row-childrens'}
                                                    sx={{ '& > td': { color: child.color, backgroundColor: child.backgroundColor } }}
                                                >
                                                    <TableCell className={'tableCell-row-name'}>
                                                        <FormattedMessage id={child.name} />
                                                    </TableCell>
                                                    {child.value && (
                                                        <>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.usd)}
                                                            </TableCell>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.vnd)}
                                                            </TableCell>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.quarter1)}
                                                            </TableCell>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.quarter2)}
                                                            </TableCell>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.quarter3)}
                                                            </TableCell>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.quarter4)}
                                                            </TableCell>
                                                            <TableCell className={'tableCell-row'}>
                                                                {formatPrice(child.value.totalRevenueEstimation)}
                                                            </TableCell>
                                                        </>
                                                    )}
                                                </TableRow>
                                            </>
                                        ))}
                                    </>
                                ))}
                            </>
                        ))}
                    </TableBody>

                    <Box sx={{ marginBottom: '30px' }} />
                    <TableBody
                        sx={{
                            '& .tableCell-row-name': {
                                fontWeight: '900'
                            },
                            '& .tableCell-row': {
                                textAlign: 'right'
                            }
                        }}
                    >
                        {summary.tableSmall.listTable.map((item: IListTable, index: number) => (
                            <TableRow key={index} sx={{ '& > td': { color: item.color, backgroundColor: item.backgroundColor } }}>
                                <TableCell className={'tableCell-row-name'}>
                                    <FormattedMessage id={item.name} />
                                </TableCell>
                                <TableCell className={'tableCell-row'}></TableCell>
                                <TableCell className={'tableCell-row'}>{formatPrice(item.value)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </>
            )}
        </>
    );
};

export default SummaryTBody;
