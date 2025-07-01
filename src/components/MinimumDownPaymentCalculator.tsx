
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

const MinimumDownPaymentCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [ownerOccupied, setOwnerOccupied] = useState<string>("yes");
  const [numberOfUnits, setNumberOfUnits] = useState<string>("1-2");

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setPurchasePrice(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setPurchasePrice(numValue);
      }
    }
  };

  const getMinimumDownPaymentPercentage = () => {
    if (ownerOccupied === "yes") {
      switch (numberOfUnits) {
        case "1-2":
          return 5;
        case "3-4":
          return 10;
        case "5+":
          return 25;
        default:
          return 5;
      }
    } else {
      switch (numberOfUnits) {
        case "1-2":
        case "3-4":
          return 20;
        case "5+":
          return 25;
        default:
          return 20;
      }
    }
  };

  const minimumDownPaymentPercentage = getMinimumDownPaymentPercentage();
  const minimumDownPayment = purchasePrice * (minimumDownPaymentPercentage / 100);
  const closingCosts = purchasePrice * 0.015;
  const requiresClosingCosts = minimumDownPaymentPercentage < 20;
  const totalRequiredFunds = minimumDownPayment + (requiresClosingCosts ? closingCosts : 0);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Mise de fonds minimale
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez la mise de fonds minimale requise selon votre situation et le type de propriété.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="purchasePrice" className="block text-lg font-medium text-slate-900 mb-3">
                  Prix d'achat
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice === 0 ? '' : purchasePrice}
                    onChange={handlePurchasePriceChange}
                    step={1000}
                    min={100000}
                    max={5000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Propriétaire occupant
                </Label>
                <Select value={ownerOccupied} onValueChange={setOwnerOccupied}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Oui</SelectItem>
                    <SelectItem value="no">Non (100% locatif)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Nombre de logements
                </Label>
                <Select value={numberOfUnits} onValueChange={setNumberOfUnits}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 logements</SelectItem>
                    <SelectItem value="3-4">3-4 logements</SelectItem>
                    <SelectItem value="5+">5 logements et +</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">Mise de fonds minimale requise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Pourcentage minimum:</span>
                      <Badge variant="secondary" className="text-lg">
                        {minimumDownPaymentPercentage}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Montant minimum:</span>
                      <span className="text-xl font-bold text-blue-700">
                        {formatCurrency(minimumDownPayment)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {requiresClosingCosts && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-orange-900 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Frais de démarrage requis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">1,5% du prix d'achat:</span>
                        <span className="text-xl font-bold text-orange-700">
                          {formatCurrency(closingCosts)}
                        </span>
                      </div>
                      <p className="text-sm text-orange-800">
                        Requis car la mise de fonds est inférieure à 20%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Total des fonds requis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Mise de fonds:</span>
                    <span className="font-semibold">{formatCurrency(minimumDownPayment)}</span>
                  </div>
                  {requiresClosingCosts && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Frais de démarrage:</span>
                      <span className="font-semibold">{formatCurrency(closingCosts)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total minimum:</span>
                      <span className="text-2xl font-bold text-green-700">
                        {formatCurrency(totalRequiredFunds)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {requiresClosingCosts && (
              <div className="mt-8 p-6 bg-slate-100 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Pourquoi les frais de démarrage de 1,5% sont-ils requis?
                </h3>
                
                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    Lorsque tu achètes une propriété avec moins de 20% de mise de fonds, ton prêt doit être assuré par la SCHL, Sagen ou Canada Guaranty. Ces assureurs exigent que l'acheteur démontre qu'il possède suffisamment de liquidités pour couvrir les frais de clôture, en plus de sa mise de fonds.
                  </p>
                  
                  <p className="font-medium">
                    ➡️ Ils demandent un minimum de 1,5% du prix d'achat pour couvrir les frais de démarrage.
                  </p>

                  <div>
                    <p className="font-medium mb-2">Ces frais incluent typiquement:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Taxe de bienvenue (droits de mutation)</li>
                      <li>Frais de notaire</li>
                      <li>Inspection préachat</li>
                      <li>Ajustements de taxes ou frais de condo</li>
                      <li>Assurance habitation</li>
                      <li>Autres frais divers (ex.: déménagement)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Les assureurs veulent s'assurer que l'acheteur:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Ne vide pas complètement ses économies avec la mise de fonds seule</li>
                      <li>Est prêt à faire face aux coûts réels de l'achat</li>
                      <li>A une certaine marge de sécurité financière pour éviter un défaut de paiement dès les premières semaines</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-medium text-blue-900">Important à noter:</p>
                    <p className="text-blue-800">
                      Tu n'as pas à dépenser les 1,5% — tu dois simplement prouver que tu les as (dans un compte bancaire, REER, don non remboursable, etc.).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimumDownPaymentCalculator;
