
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InterestRates = () => {
  // Sample data - in a real implementation, this would be fetched from Planiprêt's API
  const ratesData = [
    { term: "1 an", bankRate: "6.74%", planipretRate: "5.89%" },
    { term: "2 ans", bankRate: "6.24%", planipretRate: "5.59%" },
    { term: "3 ans", bankRate: "5.94%", planipretRate: "5.34%" },
    { term: "4 ans", bankRate: "5.84%", planipretRate: "5.24%" },
    { term: "5 ans", bankRate: "5.79%", planipretRate: "5.19%" },
    { term: "7 ans", bankRate: "6.05%", planipretRate: "5.45%" },
    { term: "10 ans", bankRate: "6.30%", planipretRate: "5.70%" },
  ];

  // Get current date in French format
  const currentDate = new Date().toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Taux d'intérêt du jour
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto mb-4">
              Comparez les taux offerts par les institutions financières traditionnelles avec ceux que je peux vous obtenir grâce à mon réseau Planiprêt.
            </p>
            <p className="text-sm text-slate-600 font-medium">
              Mise à jour du {currentDate}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left font-semibold text-slate-900">Terme</TableHead>
                  <TableHead className="text-center font-semibold text-slate-900">Taux des banques</TableHead>
                  <TableHead className="text-center font-semibold text-primary">Taux Planiprêt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ratesData.map((rate, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-slate-900">{rate.term}</TableCell>
                    <TableCell className="text-center text-slate-700">{rate.bankRate}</TableCell>
                    <TableCell className="text-center font-semibold text-primary">{rate.planipretRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                *Taux mis à jour quotidiennement. Les taux peuvent varier selon votre profil de crédit et la propriété financée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterestRates;
