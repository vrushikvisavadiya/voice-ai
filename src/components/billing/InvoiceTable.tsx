import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface InvoiceItem {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid";
}

interface InvoiceTableProps {
  invoices: InvoiceItem[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <Card className="rounded-[28px] border-border shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          Invoice history
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="text-muted-foreground">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {invoice.description}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600 hover:bg-emerald-500/10"
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="rounded-2xl">
                      <Download className="mr-2 size-4" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
