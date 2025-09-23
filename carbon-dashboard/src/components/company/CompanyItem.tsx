import Link from "next/link";
import { memo } from "react";

// Type
import { Company } from "@/types";

// Util
import { transformCountryCode } from "@/utils";

function CompanyItemComponent({ company }: { company: Company }) {
  return (
    <li key={company.id}>
      <Link href={`/companies/${company.id}`} className="block px-4 py-2 rounded-md border hover:bg-gray-100">
        <span className="text-lg">{company.name}</span> <span>({transformCountryCode(company.country)})</span>
      </Link>
    </li>
  );
}

const CompanyItem = memo(CompanyItemComponent, (prev, next) => prev.company === next.company);

export default CompanyItem;
