"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEditProfileCompFactory } from "@/hooks";

export default function Component() {
  const [avatar, setAvatar] = useState("/placeholder-user.jpg");
  const [activeSection, setActiveSection] = useState("Edit Profile");
  const Component = useEditProfileCompFactory(activeSection);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const sidebarItems = [
    "Edit Profile",
    "Account Privacy",
    "Change Password",
  ]

  return (
    <div className="container  p-4 w-full">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <nav className="w-full md:w-1/4 bg-card rounded-lg p-4 h-fit">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item}>
                <Button
                  variant={activeSection === item ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setActiveSection(item)}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-card rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">{activeSection}</h1>
          {Component && <Component />}
        </main>
      </div>
    </div>
  )
}