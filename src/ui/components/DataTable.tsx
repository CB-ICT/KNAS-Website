import React, { useMemo, useState } from 'react';
import { ArrowDownUp, ArrowDown, ArrowUp } from 'lucide-react';
import './DataTable.css';

export interface Column<Row> {
  key: string;
  header: string;
  render?: (row: Row) => React.ReactNode;
  /** Waarde om op te sorteren; zonder deze functie is de kolom niet sorteerbaar. */
  sortValue?: (row: Row) => string | number;
  align?: 'start' | 'end';
  /** Op mobiel als kaarttitel tonen (meestal naam/wedstrijd). */
  primary?: boolean;
}

interface DataTableProps<Row> {
  caption: string;
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  captionHidden?: boolean;
  emptyMessage?: string;
}

/*
 * Echte <table> voor schermlezers en desktop. Onder 768px wordt elke rij een kaart met
 * "label: waarde"-regels (data-label), zodat er nooit horizontaal gescrold hoeft te worden.
 */
export default function DataTable<Row>({ caption, columns, rows, rowKey, captionHidden, emptyMessage = 'Geen resultaten gevonden.' }: DataTableProps<Row>) {
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);

  const sortedRows = useMemo(() => {
    const column = sort && columns.find((c) => c.key === sort.key);
    if (!column?.sortValue) return rows;
    const factor = sort!.dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = column.sortValue!(a);
      const vb = column.sortValue!(b);
      return (typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb), 'nl')) * factor;
    });
  }, [rows, columns, sort]);

  const toggleSort = (key: string) =>
    setSort((prev) => (prev?.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  return (
    <div className="k-table-wrap">
      {/* Expliciete rollen: Safari laat tabelsemantiek vallen zodra display wordt aangepast. */}
      <table className="k-table" role="table">
        <caption className={captionHidden ? 'k-visually-hidden' : 'k-table__caption'}>{caption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((column) => {
              const active = sort?.key === column.key;
              const ariaSort = active ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : column.sortValue ? 'none' : undefined;
              const SortIcon = !active ? ArrowDownUp : sort!.dir === 'asc' ? ArrowUp : ArrowDown;
              return (
                <th key={column.key} role="columnheader" scope="col" aria-sort={ariaSort} className={column.align === 'end' ? 'is-end' : undefined}>
                  {column.sortValue ? (
                    <button type="button" className="k-table__sort" onClick={() => toggleSort(column.key)}>
                      {column.header}
                      <SortIcon aria-hidden="true" />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {sortedRows.length === 0 ? (
            <tr role="row">
              <td role="cell" colSpan={columns.length} className="k-table__empty">{emptyMessage}</td>
            </tr>
          ) : (
            sortedRows.map((row) => (
              <tr key={rowKey(row)} role="row">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    role="cell"
                    data-label={column.header}
                    className={[column.primary ? 'is-primary' : '', column.align === 'end' ? 'is-end' : ''].filter(Boolean).join(' ') || undefined}
                  >
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
