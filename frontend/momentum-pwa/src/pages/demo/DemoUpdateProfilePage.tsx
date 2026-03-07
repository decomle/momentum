import { useState } from "react"
import { LeftAlginedHeading } from "@/components/headings"

const TIMEZONES = [
	"Asia/Ho_Chi_Minh",
	"Asia/Bangkok",
]

export default function DemoUpdateProfilePage() {
	const [query, setQuery] = useState("Asia/Ho_Chi_Minh")
	const [open, setOpen] = useState(false)

	const filtered = TIMEZONES.filter((tz) =>
		tz.toLowerCase().includes(query.toLowerCase())
	)

	function selectTimezone(tz: string) {
		setQuery(tz)
		setOpen(false)
	}

	return (
		<div className="min-h-full flex items-start justify-center p-4">
			<div className="w-full max-w-md">
				<LeftAlginedHeading heading="Update profile" desc="Tell me a little more about you..." />

				<div className="pt-6 border-t border-neutral-200 space-y-3">

					{/* Username (readonly) */}
					<div>
						<label className="block text-sm text-neutral-600 mb-1">
							Username
						</label>
						<input
							type="text"
							value="dat"
							readOnly
							className="w-full px-3 py-2 border border-neutral-200 rounded-md bg-neutral-100 text-neutral-500"
						/>
					</div>

					{/* Email (readonly) */}
					<div>
						<label className="block text-sm text-neutral-600 mb-1">
							Email
						</label>
						<input
							type="email"
							value="dat@example.com"
							readOnly
							className="w-full px-3 py-2 border border-neutral-200 rounded-md bg-neutral-100 text-neutral-500"
						/>
					</div>

					{/* First Name */}
					<div>
						<label className="block text-sm text-neutral-600 mb-1">
							First name
						</label>
						<input
							type="text"
							placeholder="Dat"
							className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
						/>
					</div>

					{/* Last Name */}
					<div>
						<label className="block text-sm text-neutral-600 mb-1">
							Last name
						</label>
						<input
							type="text"
							placeholder="Phung"
							className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
						/>
					</div>

					{/* Timezone Combobox */}
					<div className="relative">
						<label className="block text-sm text-neutral-600 mb-1">
							Timezone
						</label>

						<input
							value={query}
							onChange={(e) => {
								setQuery(e.target.value)
								setOpen(true)
							}}
							onFocus={() => setOpen(true)}
							placeholder="Search timezone"
							className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
						/>

						<p className="mt-1 text-xs text-neutral-500">
							Type to select your timezone...
						</p>

						{open && (
							<div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-sm max-h-40 overflow-y-auto z-10">
								{filtered.map((tz) => (
									<button
										key={tz}
										type="button"
										onClick={() => selectTimezone(tz)}
										className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100"
									>
										{tz}
									</button>
								))}

								{filtered.length === 0 && (
									<div className="px-3 py-2 text-sm text-neutral-400">
										No result
									</div>
								)}
							</div>
						)}
					</div>

					{/* Phone */}
					<div>
						<label className="block text-sm text-neutral-600 mb-1">
							Phone number (optional)
						</label>
						<input
							type="tel"
							placeholder="+84..."
							className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
						/>
					</div>

					{/* Self intro */}
					<div>
						<label className="block text-sm text-neutral-600 mb-1">
							Self introduction (optional)
						</label>
						<textarea
							rows={3}
							placeholder="A few words about yourself..."
							className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
						/>
					</div>

					{/* Save */}
					<button
						type="button"
						className="w-full py-2 btn-primary rounded-md transition"
					>
						Save Changes
					</button>

				</div>
			</div>
		</div>
	)
}
